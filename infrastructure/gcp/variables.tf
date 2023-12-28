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

variable "public_bucket_name" {
  description = "Public bucket name Google Cloud Storage"
  type        = string
}

variable "public_pubsub_storage_topic_name" {
  description = "Google Cloud Pub/Sub storae events topic name"
  type        = string
}

variable "public_pubsub_storage_subscription_name" {
  description = "Google Cloud Pub/Sub storage events subscription name"
  type        = string
}

variable "gcs_location" {
  description = "Google Cloud Storage Location"
  default     = "EU"
}
