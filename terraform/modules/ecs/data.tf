locals {
  secrets = [
      {
        "name": "DATABASE_HOST",
        "valueFrom": "${var.database_host_arn}"
      },
      {
        "name": "DATABASE_PASSWORD",
        "valueFrom": "${var.database_password_arn}"
      },
      {
        "name":  "REDIS_HOST",
        "valueFrom": "${var.redis_address_arn}"
      },
      {
        "name":  "ROLLBAR_ACCESS_TOKEN",
        "valueFrom": "${var.rollbar_token_arn}"
      },
      {
        "name":  "SES_SECRET_KEY",
        "valueFrom": "${var.ses_secret_key_arn}"
      },
      {
        "name":  "SES_API_KEY",
        "valueFrom": "${var.ses_api_key_arn}"
      },
      {
        "name":  "SES_REGION",
        "valueFrom": "${var.ses_region_arn}"
      },
      {
        "name":  "S3_SECRET_KEY",
        "valueFrom": "${var.s3_secret_key_arn}"
      },
      {
        "name":  "S3_API_KEY",
        "valueFrom": "${var.s3_api_key_arn}"
      }
  ]
  environment     = [
      { "name": "NODE_ENV", "value": "production" },
      { "name": "APP_PORT", "value": "3000" },
      { "name": "DATABASE_TYPE", "value" : "postgres" },
      { "name": "DATABASE_NAME", "value" : "${var.database_name}" },
      { "name": "DATABASE_USERNAME", "value": "${var.database_user}" },
      { "name": "DATABASE_PORT", "value": "5432" },
      { "name": "REDIS_PORT", "value": "6379" },
      { "name": "APP_FRONTEND_URL", "value": "https://rats-up.com" },
      { "name": "SANDGRID_SENDER_EMAIL", "value": "info@rats-up.com" },
      { "name": "S3_REGION", "value": "ap-northeast-1" },
      { "name": "S3_BUCKET", "value": "${var.s3_bucket}" },
  ]
}
