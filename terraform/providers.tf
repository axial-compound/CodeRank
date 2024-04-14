provider "aws" {
    region = "ap-south-1"
    profile = "default"
}

terraform {
  backend "s3" {
    bucket = "coderank-terra-state"  # Your S3 bucket name
    key    = "coderank-tf-state/terraform.tfstate"  # Path to the state file
    region = "ap-south-1"
  }
}
