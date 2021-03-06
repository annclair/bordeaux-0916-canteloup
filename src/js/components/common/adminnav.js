
((app) => {
    'use strict'
    app.component("adminnav", {
        bindings: {
            editMode: '=',
            ngModel: '='
        },
        templateUrl: 'js/components/common/adminnav.html',
        controller: function(PageService, UserService, $state) {
            angular.extend(this, {
                initialData: null,
                $onInit() {
                  UserService.getCurrent().then((user) => {
                        this.user = user
                    }).catch((err) => {
                    })

                    PageService.get(this.ngModel.name).then((res) => {
                        if (res.data.content)
                            res.data.content = JSON.parse(res.data.content)
                        this.ngModel = res.data

                        this.initialData = this.ngModel
                    })
                },
                save() {
                    PageService.save(Object.assign({}, this.ngModel)).then((res) => {
                        this.editMode = false
                        toastr.success("Sauvegardé !", "Edition")
                    })
                },
                cancel() {
                    this.editMode = false
                    this.ngModel = this.initialData
                },
                disconnect(){
                  UserService.disconnect().then(()=>{
                    this.user = null
                    $state.reload()
                    toastr.success("Vous êtes déconnecté", "Connection")
                  })
                }
            })
        }
    })
})(angular.module('app.common'))
