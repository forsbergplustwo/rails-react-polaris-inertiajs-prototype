class OrdersController < ApplicationController
  before_action :set_order, only: [:edit, :update]
  # Example of shared props (common to all actions)
  inertia_share user: {name: "Bjorn Forsberg", email: "bjorn@forsbergplustwo.com", shop_name: "FORSBERG+two"}

  # GET /orders
  # GET /orders.json
  def index
    sort = params[:sort] || "desc"
    orders = Order.all.order(created_at: sort).map do |order|
      order.as_json.merge(
        created_at: order.created_at.strftime("%b %d, %Y"),
        edit_url: edit_order_path(order)
      )
    end
    render inertia: "Orders/Index",
           props: {
             sort: sort,
             orders: orders,
           }
  end

  # GET /orders/1/edit
  def edit
    render inertia: "Orders/Edit",
           props: {
             order: @order.as_json,
             orders_path: orders_path,
           }
  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: "Order was successfully updated." }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def order_params
    params.require(:order).permit(:index, :edit)
  end
end
