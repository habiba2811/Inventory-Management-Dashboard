variable "cidr_block" {
  default     = "10.0.0.0/16"
  type        = string
  description = "this is the cidr of the vpc."
}

variable "gh_user" {
  type = string
}

variable "gh_token" {
  type = string
}