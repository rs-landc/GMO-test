terraform {
  backend "s3" {
    bucket                  = ""
    key                     = "sample-partygmo-staging/terraform.tfstate"
    region                  = "ap-northeast-1"
  }
}