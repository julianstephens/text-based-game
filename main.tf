resource "google_storage_bucket" "default" {
  name     = split("-", var.project)[0]
  location = var.location
  project  = var.project

  versioning {
    enabled = true
  }
}

output "bucket_id" {
  value = google_storage_bucket.default.id
}
