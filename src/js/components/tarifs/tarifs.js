((app) => {
    'use strict'
    app.component("tarifs", {
      bindings: {
          editMode: "<",
          ngModel: "="
      },
        templateUrl: 'js/components/tarifs/tarifs.html',
        controller: function($location, $anchorScroll, TarifsService) {
          angular.extend(this, {
                page: {
                    name: 'tarifs',
                    content: ''
                },
                $onInit() {
                    TarifsService.getAll().then((res) => {
                        this.tarifs = res.data
                    })
                },
                gotofirstPart() {
                    $location.hash('firstPart')
                    $anchorScroll()
                },

                gototitle() {
                    $location.hash('title_page')
                    $anchorScroll()
                }
            })
        }
    })
})(angular.module('app.tarifs'))
