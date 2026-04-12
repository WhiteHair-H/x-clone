#!/bin/bash
set -ex
exec > >(tee /var/log/user-data.log) 2>&1

echo "=== X-Clone deployment started ==="

# -------------------------------------------------------
# 1. System update
# -------------------------------------------------------
dnf update -y

# -------------------------------------------------------
# 2. Install Node.js 20
# -------------------------------------------------------
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
dnf install -y nodejs git

# -------------------------------------------------------
# 3. Install PostgreSQL 15
# -------------------------------------------------------
dnf install -y postgresql15-server postgresql15
/usr/bin/postgresql-setup --initdb

# Allow password auth for TCP connections (keep peer for local socket)
sed -i 's/ident$/md5/' /var/lib/pgsql/data/pg_hba.conf

systemctl start postgresql
systemctl enable postgresql

# Create DB user & database
sudo -u postgres psql -c "CREATE USER xclone WITH PASSWORD 'xclone123';"
sudo -u postgres psql -c "CREATE DATABASE xclone OWNER xclone;"

# -------------------------------------------------------
# 4. Install nginx
# -------------------------------------------------------
dnf install -y nginx
systemctl enable nginx

# -------------------------------------------------------
# 5. Install global tools
# -------------------------------------------------------
npm install -g pm2 tsx

# -------------------------------------------------------
# 6. Clone & build app
# -------------------------------------------------------
APP_DIR=/home/ec2-user/x-clone

# ★ 아래 URL을 본인의 GitHub 레포 주소로 변경하세요
git clone https://github.com/<YOUR_GITHUB_USERNAME>/x-clone.git "$APP_DIR"
cd "$APP_DIR"

npm install

# Create .env
cat > .env << 'EOF'
DATABASE_URL=postgresql://xclone:xclone123@localhost:5432/xclone
NODE_ENV=production
PORT=3000
EOF

# Build frontend
npm run build

# -------------------------------------------------------
# 7. Start app with PM2
# -------------------------------------------------------
chown -R ec2-user:ec2-user "$APP_DIR"
sudo -u ec2-user bash -c "cd $APP_DIR && pm2 start tsx -- server/index.ts --name x-clone"
sudo -u ec2-user bash -c "pm2 save"

# PM2 startup on boot
env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user
systemctl enable pm2-ec2-user

# -------------------------------------------------------
# 8. Configure nginx reverse proxy
# -------------------------------------------------------
cat > /etc/nginx/conf.d/x-clone.conf << 'NGINX'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

# Remove default config if it conflicts
rm -f /etc/nginx/conf.d/default.conf

systemctl start nginx

echo "=== X-Clone deployment complete ==="
echo "Access your app at http://<EC2_PUBLIC_IP>"
