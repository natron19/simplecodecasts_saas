class Users::RegistrationsController < Devise::RegistraitonsController 

  def create 
    #import everything this does in devise then add some code 
    super do |resource| 
      #if there is a plan in params 
      if params[:plan]
        #set the plan_id from the params plan_id 
        resource.plan_id = params[:plan] 
        #save if user.first.plan_id == 2
        if resource.plan_id == 2
          resource.save_with_payment 
        else 
          resource.save 
        end 
      end 
    end 
  end

end 