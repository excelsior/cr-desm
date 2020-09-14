Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # This route will be starting point of the desm SPA
  root "homepage#index"

  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :session_status, to: 'sessions#session_status'
  
  
  namespace :api do
    namespace :v1 do
      resources :domains, only: [:index, :show]
      resources :mappings, only: [:create, :show, :index]
      resources :organizations, only: [:index, :show, :create, :update, :destroy]
      resources :roles, only: [:index]
      resources :terms, only: [:show, :update, :destroy]

      post 'specifications' => 'specifications#create'
      post 'specifications/info' => 'specifications#info'
      post 'specifications/filter' => 'specifications#filter'
    end
  end

  resources :users, only: [:index, :show, :update, :destroy]

  # Redirect all missing routes to home
  get '/*path' => 'homepage#index'
end
