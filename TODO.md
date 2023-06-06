[ ] filterMode should be renamed to 'activeFilterPane'
[ ] add routes for byTopic, byYear, byText (renders the modeselector with different "activeFilterPane")
[ ] add a filter state component (probably a reducer) that keeps track of the three filter types (topic, year, text); whether they're active, and what is selected
[ ] add more complete logic that filters the questionList based on the filter state component
[ ] extend the Question component to
    - have a "back to results" link at the top (no longer show the filters)
    - list the topics (and have options to add / remove topics)
    - show the OCR text and allow the user to edit it
[ ] have a select/deselect all option for the checkbox arrays may be helpful...


[ ] add whitespace in various locations to improve look (especially around text search box)