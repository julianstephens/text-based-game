variable "location" {
  type        = string
  default     = "us-east1"
  description = "The GCS region."
}

variable "project" {
  type        = string
  default     = null
  description = "The ID of the project in which the resource belongs. If it is not provided, the provider project is used."
}