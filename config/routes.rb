Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks/create'
      put 'tasks/edit'
      get '/show/:id', to: 'tasks#show'
      delete '/destroy/:id', to: 'tasks#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end