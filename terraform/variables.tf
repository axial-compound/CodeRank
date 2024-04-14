variable "application_name" {
  description = "Application Name"
  default     = "code-rank"
}

variable "aws_account" {
  description = "AWS Account Details"
}

variable "bucket_name" {
  description = "S3 Bucket Name"
}

variable "cloudfront_origin_path" {
  description = "The CloudFront origin path"
  type        = string
  default     = ""
}

variable "cloudfront_price_class" {
  description = "The price class for the CloudFront distribution"
  type        = string
  default     = "PriceClass_All"
}

variable "cloudfront_default_root_object" {
  description = "The default root object for the CloudFront distribution"
  type        = string
  default     = "index.html"
}