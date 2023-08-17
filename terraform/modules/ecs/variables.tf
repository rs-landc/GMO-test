
variable "name" {
  description = "Name to be used on all the resources as identifier"
  default     = ""
}

variable "cloudwatch_log_group_name" {
  description = "Name of cloudwatch log group"
  default     = ""
}

variable "image_url" {
  description = "URL of ecr image url"
  default     = ""
}

variable "lb_blue_arn" {
  description = "ARN of application loadbalancer"
  default     = ""
}

variable "subnets" {
  description = "Ids of the subnets"
  default     = []
}

variable "security_groups" {
  description = "Ids of the security groups"
  default     = []
}

variable "iam_arn" {
  description = "ARN of ECS Task"
  default     = ""
}

variable "database_password_arn" {
  description = "ARN of database password"
  default     = ""
}

variable "database_host_arn" {
  description = "ARN of the database host"
  default     = ""
}

variable "env" {
  description = "ENV rails"
  default     = ""
}

variable "redis_address_arn" {
  description = "ARN of redis"
  default     = ""
}

variable "git_token_arn" {
  description = "Github Token ARN"
}

variable "ecs_exec_kms_arn" {
  description = "ECS KMS ARN"
}

variable "ecs_exec_s3_bucket_name" {
  description = "ECS Exec S3 bucket name"
}

variable "cloudwatch_log_group_ecs_exec_name" {
  description = "Cloudwatch log group of ecs exec"
}

variable "database_name" {
  description = "Name of database name"

}

variable "database_user" {
  description = "Name of database user"
}

variable "ses_secret_key_arn" {
  description = "AWS Secret Key for SES "
}

variable "ses_api_key_arn" {
  description = "AWS Secret ID for SES"
}

variable "ses_region_arn" {
  description = "AWS Region for SES"
}

variable "rollbar_token_arn" {
  description = "Basic auth username"
}

variable "s3_secret_key_arn" {
  description = "AWS Secret Key for S3 "
}

variable "s3_api_key_arn" {
  description = "AWS Secret ID for S3"
}

variable "s3_bucket" {
  description = "AWS Bucket S3"
}
