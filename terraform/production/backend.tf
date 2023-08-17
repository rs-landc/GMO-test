terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "sample-partygmo-production/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}