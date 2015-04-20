class Users::RegistrationsController < Devise::RegistrationsController 

  before_filter :select_plan, only: :new

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

  private 

  def select_plan 
    unless params[:plan] && (params[:plan] == '1' || params[:plan] == '2') 
      flash[:notice] = "Please select a plan" 
      redirect_to root_url 
    end 
  end  

end 