class MessagesController < ApplicationController
  before_action :group_set

  def index
    @users = @group.users
    @messages = @group.messages.includes(:user)
    @message = Message.new
    respond_to do |format|
      format.html
      format.json { @new_message = @messages.where('id > ?', params[:message][:id]) }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json
      end
    else
      render action: :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def group_set
    @group = Group.find(params[:group_id])
  end
end
