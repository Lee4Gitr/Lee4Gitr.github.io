/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO - DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url is defined', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* TODO - DONE: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('has a name', function() {
            for (i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* TODO - DONE: Write a new test suite named "The menu" */

    describe('The menu', function() {

        /* TODO - DONE: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // I checked the forums after being stuck and found this solution from jcast90 and also GauthamRajesh

        it('should be hidden by default', function() {
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

        /* TODO - DONE: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('should change visibility when the menu icon is clicked', function() {
            // I feel like there has to be a better way than to repeat this code.
            // This also seems to fail but it it a solution found from jcast90.
            // I fixed this issue. I had a plugin blocking my test from passing. I used code I knew would pass here for that reason.
            $("a.menu-icon-link").click();
            expect(document.body.className).not.toContain('menu-hidden');
            $("a.menu-icon-link").click();
            expect(document.body.className).toContain('menu-hidden');
        });

    });

    /* TODO - DONE: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* TODO - DONE: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("should have at least a single .entry element within the .feed container", function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO - DONE: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* TODO - DONE: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // AshleyED and the forum question, posed by heidi and explained by JohnMav, helped me understand this test.
        // Link to the forum question: https://discussions.udacity.com/t/new-feed-selection-question/16274/12.

        var $feed;

        // loadFeed(0) is just the initalized function, so this test tests the data that is currently up against the data that was previously up, not against the initialized function.
        beforeEach(function(done) {
            loadFeed(1, function() {
                // current feed after loadFeed(1) is called is saved as the variable $feed.
                $feed = $('.feed').text();
                done();
            });
        });

        it('content actually changes', function(done) {
            loadFeed(2, function() {
                // current feed after loadFeed(2) is called compared to $feed.
                expect($('.feed').text()).not.toBe($feed);
                done();
            });
        });
    });
});