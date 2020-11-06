# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Order.create(name: "#1001", customer_location: "Vedbæk, Denmark", customer_name: "Bjorn Forsberg", customer_email: "bjorn@forsbergplustwo.com")
Order.create(name: "#1002", customer_location: "Bangalore, India", customer_name: "Arjun Rajkumar", customer_email: "arjun@forsbergplustwo.com")
