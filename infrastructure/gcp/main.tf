provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project" "project" {
  name       = var.project_name
  project_id = var.project_id
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
