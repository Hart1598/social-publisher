variable "project_name" {
  description = "Project name"
  type        = string
}

variable "project_id" {
  description = "Project id"
  type        = string
}

variable "region" {
  description = "Region"
  default     = "us-central1"
}

variable "billing_account_id" {
  description = "Billing account id"
  type        = string
}
