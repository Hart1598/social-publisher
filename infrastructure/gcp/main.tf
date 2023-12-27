provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project" "project" {
  name       = var.project_name
  project_id = var.project_id
  billing_account = var.billing_account_id
}

resource "google_project_service" "storage_api" {
  project = google_project.project.project_id
  service = "storage.googleapis.com"
}

resource "google_project_service" "pubsub_api" {
  project = google_project.project.project_id
  service = "pubsub.googleapis.com"
}

resource "google_service_account" "storage_account" {
  project      = google_project.project.project_id
  account_id   = "storage-account"
  display_name = "Storage Service Account"
}

resource "google_project_iam_binding" "storage_admin" {
  project = google_project.project.project_id
  role    = "roles/storage.admin"
  members = [
    "serviceAccount:${google_service_account.storage_account.email}"
  ]
}

resource "google_project_iam_binding" "pubsub_admin" {
  project = google_project.project.project_id
  role    = "roles/pubsub.admin"
  members = [
    "serviceAccount:${google_service_account.storage_account.email}"
  ]
}

resource "google_storage_bucket" "public_bucket" {
  name          = var.public_bucket_name
  project       = google_project.project.project_id
  location      = var.gcs_location
  force_destroy = true
}

resource "google_pubsub_topic" "gcs_notifications" {
  name    = var.public_pubsub_storage_topic_name
  project = google_project.project.project_id
}

resource "google_storage_notification" "gcs_notification" {
  bucket         = google_storage_bucket.public_bucket.name
  topic          = google_pubsub_topic.gcs_notifications.id
  event_types    = ["OBJECT_FINALIZE", "OBJECT_METADATA_UPDATE", "OBJECT_DELETE", "OBJECT_ARCHIVE"]
  payload_format = "JSON_API_V1"
  depends_on     = [google_pubsub_topic.gcs_notifications]
}

resource "google_pubsub_topic_iam_binding" "pubsub_storage_publisher" {
  project = google_project.project.project_id
  topic   = google_pubsub_topic.gcs_notifications.id
  role    = "roles/pubsub.publisher"

  members = [
    "serviceAccount:service-${google_project.project.number}@gs-project-accounts.iam.gserviceaccount.com"
  ]
}


resource "google_pubsub_topic_iam_binding" "pubsub_publisher" {
  project = google_project.project.project_id
  topic   = google_pubsub_topic.gcs_notifications.id
  role    = "roles/pubsub.publisher"
  members = [
    "serviceAccount:${google_service_account.storage_account.email}"
  ]
  depends_on = [google_pubsub_topic.gcs_notifications]
}

resource "google_pubsub_subscription" "gcs_subscription" {
  name    = var.public_pubsub_storage_subscription_name
  topic   = google_pubsub_topic.gcs_notifications.id
  project = google_project.project.project_id
  ack_deadline_seconds = 20
}
