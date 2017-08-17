angular.module('app.services', [])


.service('News', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/News';
    var currentID = 1;

    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Directory', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/Directory';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('EventReports', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/EventRegistration';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        update: function(params){
            u_api_url = api_url + '/StationId/' + params.stationId;
            var data = {
                'RegisteredMember': params.name,
                'Available': 'N'
            };
            return $http.patch(u_api_url, data).then(function(resp){
                return resp.data;
            });
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+ 'Available=Y&'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Calendar', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/Calendar';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id !== '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.Id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        update: function(params){
            u_api_url = api_url + '/Id/' + params.Id;
            var data = {
                'CheckedIn': 'Checked In!'
            };
            return $http.patch(u_api_url, data).then(function(resp){
                return resp.data;
            });
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        },
        reportquery: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+ 'Available=N&'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('EventRegistration', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/EventRegistration';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        update: function(params){
            u_api_url = api_url + '/StationId/' + params.stationId;
            var data = {
                'RegisteredMember': params.name,
                'Available': 'N'
            };
            return $http.patch(u_api_url, data).then(function(resp){
                return resp.data;
            });
        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+ 'Available=Y&'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        },
        reportquery: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+ 'Available=N&'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('TwitterService', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
    // 1
    var twitterKey = "STORAGE.TWITTER.KEY";
    var clientId = 'TwitterAppConsumerKey';
    var clientSecret = 'TwitterAppConsumerSecret';

    // 2
    function storeUserToken(data) {
        window.localStorage.setItem(twitterKey, JSON.stringify(data));
    }

    function getStoredToken() {
        return window.localStorage.getItem(twitterKey);
    }

    // 3
    function createTwitterSignature(method, url) {
        var token = angular.fromJson(getStoredToken());
        var oauthObject = {
            oauth_consumer_key: clientId,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };
        var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
        $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    }

    return {
        // 4
        initialize: function() {
            var deferred = $q.defer();
            var token = getStoredToken();

            if (token !== null) {
                deferred.resolve(true);
            } else {
                $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
                    storeUserToken(result);
                    deferred.resolve(true);
                }, function(error) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        },
        // 5
        isAuthenticated: function() {
            return getStoredToken() !== null;
        },
        // 6
        getHomeTimeline: function() {
            var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
            createTwitterSignature('GET', home_tl_url);
            return $resource(home_tl_url).query();
        },
        storeUserToken: storeUserToken,
        getStoredToken: getStoredToken,
        createTwitterSignature: createTwitterSignature
    };
})

.service('News', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/News';
    var currentID = 1;

    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('TeacherService', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/Teachers';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                console.log(resp.data)
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    //ret.all();
    
    return ret;

}])

.service('RegistrationService', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/Members';
    var currentID = 1;

    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        addParents: function(d){
            currentID++;
            d.id = currentID;
            console.log(d)
            
            return $http.post(api_url, d).then(function(resp){
                return resp.data;
            });

        },
        query: function(params){
            
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}])

.service('Events', ['$http', function($http){

    var api_url = 'https://sheetsu.com/apis/v1.0/15fe8480741a/sheets/Events';
    var currentID = 1;

    function filterBlankRows(l){
        return l.filter(function(obj){
            return obj.id != '';
        });
    }
    
    var ret = {
        all: function(){
            
            return $http.get(api_url).then(function(resp){
                if (resp.data.length > 0) currentID = parseInt(resp.data[resp.data.length-1].id);
                return resp.data;
            });
            
        }, 
        add: function(data){
            currentID++;
            data.id = currentID;
            
            return $http.post(api_url, data).then(function(resp){
                return resp.data;
            });

        },
        query: function(params){
            console.log('Querying for Events');
            var actual_params = [];
            for (var k in params){
                if (params[k]){
                    actual_params.push(k + '=' + params[k]);
                }
            }
            actual_params = '?'+actual_params.join('&');
            console.log(actual_params);
            
            return $http.get(api_url+'/search'+actual_params).then(function(resp){
                return filterBlankRows(resp.data);
            })
            
        }
    }
    
    ret.all();
    
    return ret;

}]);