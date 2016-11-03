// IIFE

(function() {
    
    "use strict"
    
    var app = angular
                .module("productResourceMock", 
                        ["ngMockE2E"]);
                
    app.run(function($httpBackend) {
        var products = [
            {
                " productId": 1,
                "productName": "Leaf Rake",
                "productCode": "GDN-11",
                "releaseDate": "march 19",
                "description": "Leaf eake desc",
                "cost": 9.00,
                "price": 19.95,
                "category": "garden",
                "tags": ["leaf", "tool" ],
                "imageUrl": "images/image1.jpg"
            },
            {
                " productId": 5,
                "productName": "Hammer",
                "productCode": "GDN-12",
                "releaseDate": "march 21",
                "description": "Leaf lakee desc",
                "cost": 1.00,
                "price": 12.95,
                "category": "zarden",
                "tags": ["eaf", "ool" ],
                "imageUrl": "images/image2.png"
            }]
            
        var productUrl = "/api/products"
        
        $httpBackend.whenGET(productUrl).respond(products)
        
        var editingRegex = new RegExp(productUrl + '/[0-9][0-9]*', '')
        
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var product = {'productId': 0}
            var parameters = url.split('/')
            var length = parameters.length
            var id = parameters[length - 1]
            
            if(id > 0) {
                for(var i=0; i<products.length; i++) {
                    if(products[i].productId == id) {
                        product = products[i]
                        break
                    }
                }
            }
            return [200, product, {}]
        })
        
        $httpBackend.whenPOST(editingRegex).respond(function (method, url, data) {
            var product = angular.fromJson(Data)
            
            if(!product.productId) {
                // new product
                product.productId = products[products.length-1].productId + 1
                products.push(product)
            }
            else {
                for(var i=0; i<products.length; i++) {
                    if(products[i].productId == product.productId) {
                        products[i] = product
                        break
                    }
                }
            }
            return [200, product, {}]
        })
        
    })
    
}());
