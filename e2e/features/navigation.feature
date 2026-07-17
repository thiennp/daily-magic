@navigation @smoke
Feature: App shell navigation
  Primary navigation and route access for guests and signed-in users.

  Background:
    Given the app is running at "http://localhost:3000"

  Scenario Outline: Guest can open public marketing routes
    When I open "<path>"
    Then the page should load without requiring login

    Examples:
      | path         |
      | /            |
      | /showcases   |
      | /login       |

  Scenario Outline: Authenticated user reaches app routes
    Given I am signed in as "test-nav-1@agentwitch.com"
    And my Mac is paired
    When I open "<path>"
    Then I should not be redirected to login

    Examples:
      | path           |
      | /              |
      | /marketplace   |
      | /library       |
      | /automations   |
      | /reports       |
      | /admin/groups  |

  Scenario: Primary nav highlights active section
    Given I am signed in as "test-nav-2@agentwitch.com"
    And my Mac is paired
    When I open "/library"
    Then the "Library" nav item should appear active

  Scenario: Showcase article opens from index
    When I open "/showcases"
    And I open showcase article "onboard-in-15-minutes"
    Then I should see the article title on "/showcases/onboard-in-15-minutes"
