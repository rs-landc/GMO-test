variable "name" {
  description = "Name to be used on all the resources as identifier"
}

variable "database_password" {
  description = "Password of the database"
}

variable "database_host" {
  description = "Name of the database host"
}

variable "web_container_name" {
  description = "Name of the docker image"
}

variable "docker_username" {
  description = "Docker username"
}

variable "docker_password" {
  description = "Docker password"
}

variable "subnet" {
  description = "Subnet for standalone task"
}

variable "security_group" {
  description = "Security Group"
}

variable "redis_address" {
  description = "Address of the redis server"
}

variable "git_token" {
  description = "Github Token"
}

variable "ses_secret_key" {
  description = "AWS Secret Key for SES "
}

variable "ses_api_key" {
  description = "AWS Secret ID for SES"
}

variable "ses_region" {
  description = "AWS Region for SES"
}

variable "rollbar_token" {
  description = "Rollbar Token"
}

variable "s3_secret_key" {
  description = "AWS Secret Key for S3 "
}

variable "s3_api_key" {
  description = "AWS Secret ID for S3"
}
