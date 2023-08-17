terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "sample-partygmo-development/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}