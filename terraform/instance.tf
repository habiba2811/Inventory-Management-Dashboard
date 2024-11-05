data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-*"]
  }

  filter {
    name   = "boot-mode"
    values = ["uefi-preferred"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  owners = ["099720109477"]
}


resource "aws_security_group" "ec2_access" {
  name        = "ec2_access"
  description = "Allow TLS, HTTP, SSH inbound traffic and all outbound traffic"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "ec2_access"
  }
}

# Allow inbound TLS traffic (port 443)
resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv4" {
  security_group_id = aws_security_group.ec2_access.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
}

# Allow inbound HTTP traffic (port 80)
resource "aws_vpc_security_group_ingress_rule" "allow_http_ipv4" {
  security_group_id = aws_security_group.ec2_access.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}

# Allow inbound SSH traffic (port 22)
resource "aws_vpc_security_group_ingress_rule" "allow_ssh_ipv4" {
  security_group_id = aws_security_group.ec2_access.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}

# Allow all outbound traffic
resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.ec2_access.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "my-key"
  public_key = file("~/.ssh/my-key.pem.pub")
}

resource "aws_instance" "web" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.deployer.key_name
  vpc_security_group_ids      = [aws_security_group.ec2_access.id]
  subnet_id                   = aws_subnet.public.id
  associate_public_ip_address = true
  tags = {
    Name = "ec2-inventorymanagement-backend"
  }
  user_data = <<-EOF
              #!/bin/bash 
              exec > >(tee /home/ubuntu/setup.log | logger) 2>&1
              git clone https://${var.gh_user}:${var.gh_token}@github.com/habiba2811/Inventory-Management-Dashboard.git inventory-management
              curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
              export NVM_DIR="$HOME/.nvm"
              [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
              nvm install node
              node -v
              npm -v
              cd /inventory-management/server
              npm i
              npm run dev&
              cd /inventory-management/client
              export PORT=80
              npm i
              npm run dev
              EOF
}
