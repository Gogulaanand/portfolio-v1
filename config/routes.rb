Rails.application.routes.draw do
  get '/todo', to: 'pages#todo'

  get '/game', to: 'pages#game'

  get '/home', to: 'pages#home'

  get '/about', to: 'pages#about'

  get '/projects', to: 'pages#projects'

  get '/contact', to: 'pages#contact'

  root 'pages#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
