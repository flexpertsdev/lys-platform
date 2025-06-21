import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  CheckCircle, 
  Package, 
  Clock,
  FileText,
  Building,
  Mail,
  Phone,
  Info
} from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  
  // Mock order data for confirmation
  const orderDetails = {
    orderNumber: orderNumber || 'ORD-2024-002',
    status: 'pending_approval',
    totalAmount: 1224.00,
    itemCount: 36,
    brandName: 'Seoul Beauty Co.',
    estimatedProcessingTime: '1-2 business days',
    paymentMethod: 'bank_transfer'
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-light mb-2">Order Submitted Successfully!</h1>
          <p className="text-gray-600">Your order has been received and is pending approval</p>
        </div>

        {/* Order Details Card */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-light">{orderDetails.orderNumber}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-xl font-medium">£{orderDetails.totalAmount.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Items</p>
                <p className="text-xl font-medium">{orderDetails.itemCount} units</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">What happens next?</h3>
              
              <ul className="timeline timeline-vertical">
                <li>
                  <div className="timeline-start timeline-box">
                    <div className="font-medium">Order Submitted</div>
                    <div className="text-sm text-gray-600">Your order has been received</div>
                  </div>
                  <div className="timeline-middle">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <hr className="bg-success" />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start timeline-box">
                    <div className="font-medium">Pending Admin Approval</div>
                    <div className="text-sm text-gray-600">LYS team will review with {orderDetails.brandName}</div>
                  </div>
                  <div className="timeline-middle">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start timeline-box">
                    <div className="font-medium">Invoice Generation</div>
                    <div className="text-sm text-gray-600">Final pricing confirmed & invoice sent</div>
                  </div>
                  <div className="timeline-middle">
                    <FileText className="h-5 w-5 text-gray-300" />
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start timeline-box">
                    <div className="font-medium">Payment & Processing</div>
                    <div className="text-sm text-gray-600">Order processed after payment received</div>
                  </div>
                  <div className="timeline-middle">
                    <Building className="h-5 w-5 text-gray-300" />
                  </div>
                  <hr />
                </li>
                <li>
                  <hr />
                  <div className="timeline-start timeline-box">
                    <div className="font-medium">Shipment & Tracking</div>
                    <div className="text-sm text-gray-600">Tracking details provided once shipped</div>
                  </div>
                  <div className="timeline-middle">
                    <Package className="h-5 w-5 text-gray-300" />
                  </div>
                </li>
              </ul>
            </div>

            {/* Important Information */}
            <div className="alert alert-info">
              <Info className="h-4 w-4" />
              <div>
                <p className="font-medium">Important Information</p>
                <ul className="text-sm mt-1 space-y-1">
                  <li>• The LYS team will review your order with the brand within {orderDetails.estimatedProcessingTime}</li>
                  <li>• Final pricing may be adjusted based on current availability and volume discounts</li>
                  <li>• You will receive an invoice once the order is approved</li>
                  <li>• Payment must be completed before order processing begins</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card bg-soft-pink mb-6">
          <div className="card-body">
            <h3 className="font-medium mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our B2B specialists are here to assist with your order
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:orders@loveingyourskin.com" className="btn btn-sm btn-outline">
                <Mail className="h-4 w-4" />
                Email Support
              </a>
              <a href="tel:+442012345678" className="btn btn-sm btn-outline">
                <Phone className="h-4 w-4" />
                Call Support
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="btn btn-primary">
            View My Orders
          </Link>
          <Link to="/catalog" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};