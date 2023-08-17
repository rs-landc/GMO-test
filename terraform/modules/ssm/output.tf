
output "database_host_arn" {
  description = "ARN of database host"
  value       = aws_ssm_parameter.database_host.arn
}

output "database_password_arn" {
  description = "ARN of database password"
  value       = aws_ssm_parameter.database_password.arn
}

output "redis_address_arn" {
  description = "ARN of the redis address"
  value       = aws_ssm_parameter.redis_address.arn
}

output "git_token_arn" {
  description = "ARN of the git token"
  value       = aws_ssm_parameter.git_token.arn
}

output "ses_secret_key_arn" {
  description = "AWS Secret Key for SES "
  value       = aws_ssm_parameter.ses_secret_key.arn
}

output "ses_api_key_arn" {
  description = "AWS Secret ID for SES"
  value       = aws_ssm_parameter.ses_api_key.arn
}

output "ses_region_arn" {
  description = "AWS Region for SES"
  value       = aws_ssm_parameter.ses_region.arn
}

output "rollbar_token_arn" {
  description = "ARN of the Rollbar Token"
  value       = aws_ssm_parameter.rollbar_token.arn
}

output "s3_secret_key_arn" {
  description = "AWS Secret Key for S3 "
  value       = aws_ssm_parameter.s3_secret_key.arn
}

output "s3_api_key_arn" {
  description = "AWS Secret ID for S3"
  value       = aws_ssm_parameter.s3_api_key.arn
}