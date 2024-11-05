resource "aws_budgets_budget" "this" {
  name            = "budget-monthly"
  budget_type     = "COST"
  limit_amount    = "1"
  limit_unit      = "USD"
  time_period_end = "2087-06-15_00:00"
  time_unit       = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 1
    threshold_type             = "ABSOLUTE_VALUE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = ["habiba.hisham2811@gmail.com"]
  }
}
