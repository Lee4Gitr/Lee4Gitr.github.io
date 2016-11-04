/*
This file handles the model as well as Google Maps API and Yelp API.
*/

    // MODEL

var locations = [
    {
        title: "Ella's Americana Folkart Cafe",
        location: {
            lat: 27.993583,
            lng: -82.45092
        },
        visible: true,
        selected: false,
        venueType: 'food',
        yelp: 'ellas-americana-folk-art-cafe-tampa'
    }, {
        title: 'Mermaid Tavern',
        location: {
            lat: 28.009529,
            lng: -82.450959
        },
        visible: true,
        selected: false,
        venueType: 'food',
        yelp: 'mermaid-tavern-tampa'
    }, {
        title: 'Hampton Station',
        location: {
            lat: 28.001234,
            lng: -82.450894
        },
        visible: true,
        selected: false,
        venueType: 'food',
        yelp: 'hampton-station-tampa'
    }, {
        title: 'Southern Brewing & Winemaking',
        location: {
            lat: 27.986204,
            lng: -82.451444
        },
        visible: true,
        selected: false,
        venueType: 'brewery',
        yelp: 'southern-brewing-and-winemaking-tampa'
    }, {
        title: 'Rooster & the Till',
        location: {
            lat: 28.006848,
            lng: -82.459722
        },
        visible: true,
        selected: false,
        venueType: 'food',
        yelp: 'rooster-and-the-till-tampa'
    }, {
        title: 'Angry Chair Brewing',
        location: {
            lat: 28.005134,
            lng: -82.459289
        },
        visible: true,
        selected: false,
        venueType: 'brewery',
        yelp: 'angry-chair-brewing-tampa'
    }, {
        title: 'Lowry Parcade & Tavern',
        location: {
            lat:28.025662,
            lng: -82.471271
        },
        visible: true,
        selected: false,
        venueType: 'drinks',
        yelp: 'lowry-parcade-and-tavern-tampa'
    }
];

    //ViewModel

var ViewModel = function() {

    var self = this;

    
    // Created markers property to store mutable data in ViewModel.(?)
    // This code is from gokuldh's project named "Neighborhood-Maps".

    this.markers = [];

    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        var selected = locations[i].selected;
        var venueType = locations[i].venueType;
        var visible = locations[i].visible;
        var yelp = locations[i].yelp;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            venueType: venueType,
            visible: visible,
            yelp: yelp,
            show: ko.observable(true),
            animation: google.maps.Animation.DROP,
            id: i
        });

        self.markers.push(marker);

        marker.addListener('click', function() {
            self.populateInfoWindow(this, infowindow);
        })
        marker.addListener('click', function() {
            this.setAnimation(google.maps.Animation.BOUNCE);
            // 'mark' now refers to 'this' in this context.  
            var mark = this;
            setTimeout(function(){mark.setAnimation(null); }, 700);
        })
    }

    // Taken for google maps course from Udacity

    self.populateInfoWindow = function(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            // Infowindow layout was taken and modified from GauthamRajesh on GitHub
            infowindow.setContent('<h5>' + marker.title + '</h5>' + '<img src=' + marker.snippet_image_url + '>' + '<br>' + '<h6>Rating:</h6>' + '<img src=' + marker.rating_img_url_small + '>' + '<h6>Review:</h6>' + '<p>' + marker.snippet_text + '</p>' + '<a href=' + marker.url + '>'+ marker.title + '</a>' );
            infowindow.open(map, marker);
        }
    }

    self.makeMarkerBounce = function() {
        for (var i = 0; i < self.markers.length; i++) {
            self.markers[i].setAnimation(google.maps.Animation.BOUNCE); 
            setTimeout(function(){ for(i = 0; i < self.markers.length; i++) {self.markers[i].setAnimation(null)}; }, 700);
        }
    };

    self.select = function(location) {

        if (location.visible) {
            infowindow.open(map, location);
            // Infowindow layout was taken and modified from GauthamRajesh on GitHub
            infowindow.setContent('<h5>' + location.title + '</h5>'+ '<img src=' + location.snippet_image_url + '>' + '<br>' + '<h6>Rating:</h6>' + '<img src=' + location.rating_img_url_small + '>' + '<h6>Review:</h6>' + '<p>' + location.snippet_text  + '</p>' + '<a href=' + location.url + '>' + location.title + '</a>' );
            location.setAnimation(google.maps.Animation.BOUNCE); 
            setTimeout(function(){ for(i = 0; i < self.markers.length; i++) {location.setAnimation(null)}; }, 700);
        }
    };

    // End of code from gokuldh

    self.addAll = function() {
        infowindow.close();
        for (var i = 0; i < self.markers.length; i++) {
            self.markers[i].setVisible(true);
            self.markers[i].show(true);
            self.markers[i].setAnimation(google.maps.Animation.BOUNCE); 
            setTimeout(function(){ for(i = 0; i < self.markers.length; i++) {self.markers[i].setAnimation(null)}; }, 700);
        }
    };

    self.filterDrinks = function() {

        infowindow.close();

        for(i = 0; i < self.markers.length; i++) {
            if (self.markers[i].venueType !== 'drinks') {
                self.markers[i].setVisible(false);
                self.markers[i].show(false);
            } else {
                self.markers[i].setVisible(true);
                self.markers[i].show(true);
                self.markers[i].setAnimation(google.maps.Animation.BOUNCE); 
                setTimeout(function(){ for(i = 0; i < self.markers.length; i++) {self.markers[i].setAnimation(null)}; }, 700);

            }
        }
    };

    self.filterFood = function() {

        infowindow.close();

        for(i = 0; i < self.markers.length; i++) {
            if (self.markers[i].venueType !== 'food') {
                self.markers[i].setVisible(false);
                self.markers[i].show(false);
            } else {
                self.markers[i].setVisible(true);
                self.markers[i].show(true);
                self.markers[i].setAnimation(google.maps.Animation.BOUNCE); 
                setTimeout(function(){ for(i = 0; i < self.markers.length; i++) {self.markers[i].setAnimation(null)}; }, 700);

            }
        }
    };

    self.filterBreweries = function() {

        infowindow.close();

        for(i = 0; i < self.markers.length; i++) {
            if (self.markers[i].venueType !== 'brewery') {
                self.markers[i].setVisible(false);
                self.markers[i].show(false);
            } else {
                self.markers[i].setVisible(true);
                self.markers[i].show(true);
                self.markers[i].setAnimation(google.maps.Animation.BOUNCE); 
                setTimeout(function(){ for(i = 0; i < self.markers.length; i++) {self.markers[i].setAnimation(null)}; }, 700);

            }
        }
    };


    // MarkN's implementation of OAuth from Udacity Forums and gauthamemail's
    // Function to obtain Yelp API information

    function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }
    var yelp_api = function(i) {
        var yelp_url = 'https://api.yelp.com/v2/business/' + self.markers[i].yelp;
            var parameters = {
                oauth_consumer_key: 'QoztSaKtCfyRpEE3HNEGPg',
                oauth_token: 'JP-gpjso7Ad4wtBgulRFqkUotB4YZ-_d',
                oauth_nonce: nonce_generate(),
                oauth_timestamp: Math.floor(Date.now()/1000),
                oauth_signature_method: 'HMAC-SHA1',
                oauth_version: '1.0',
                callback: 'cb'
            };

            var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, 'op-dkMsDitcKJCkcL1WzkxdUouc','g682uDrIpxFTBkpUziprBkr4IXc');
            parameters.oauth_signature = encodedSignature;

            var settings = {
                url: yelp_url,
                data: parameters,
                cache: true,
                dataType: 'jsonp',
                success: function(results) {
                    self.markers[i].snippet_image_url = results.snippet_image_url;
                    self.markers[i].url = results.url;
                    self.markers[i].rating_img_url_small = results.rating_img_url_small;
                    self.markers[i].snippet_text = results.snippet_text;
                    // Taken from Udacity's Intro to AJAX course.
                    clearTimeout(yelpRequestTimeout);
                },
                error: function() {
                    alert('Yelp API did not work, please try again later.')
                }
            };

            // Taken from Udacity's Intro to AJAX course.
            var yelpRequestTimeout = setTimeout(function(){
                // Update ko.observable if timeout goes through.
                self.yelp_error('The Yelp API timed out.');
            }, 5000);

            $.ajax(settings);
        }
    for(var i = 0; i < self.markers.length; i++) {
        yelp_api(i);
    }

    // I had previously seen this technique in gokuldh's project and although it gave me the idea, I've implemented it differently.

    this.yelp_error = ko.observable('');

    //Materialize's 'sidenav' tutorial
    $(".button-collapse").sideNav();
}