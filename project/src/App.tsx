import React, { useState } from 'react';
import { User, Activity, FileText, Home, CreditCard, HelpCircle, Info, MessageSquare, X, Search } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { calculatePropensityScore } from './utils/propensityScore';
import { type CustomerData } from './types/customer';
import ChatBot from './components/ChatBot';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory] = useState([
    'Life insurance plans',
    'Health insurance coverage',
    'Investment options',
    'Retirement plans'
  ]);

  // Sample customer data matching the CustomerData interface
  const customerData: CustomerData = {
    age: 36,
    annualIncome: 1200970,
    expenses: 979021,
    creditScore: 544,
    websiteVisits: 48,
    activePolicies: 5,
    maturedPolicies: 0,
    emailResponseRate: 0.9966,
    appInteractions: 28,
    feedbackScore: 9
  };

  const propensityScore = calculatePropensityScore(customerData);

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home' },
    { icon: <CreditCard size={20} />, label: 'Services' },
    { icon: <Activity size={20} />, label: 'mCash' },
    { icon: <FileText size={20} />, label: 'Explore' },
    { icon: <HelpCircle size={20} />, label: 'FAQs' },
    { icon: <Info size={20} />, label: 'About Us' },
    { icon: <MessageSquare size={20} />, label: 'Contact Us' },
  ];

  const recommendations = [
    { 
      title: 'Term Life Insurance Plus',
      description: 'Enhanced coverage with critical illness benefit',
      confidence: 95,
      reason: 'Based on your age and family status'
    },
    {
      title: 'Smart Health Elite',
      description: 'Comprehensive health coverage with global benefits',
      confidence: 88,
      reason: 'Matches your healthcare needs'
    },
    {
      title: 'Wealth Builder Pro',
      description: 'High-return investment plan with insurance benefits',
      confidence: 82,
      reason: 'Aligns with your investment goals'
    },
    {
      title: 'Child Future Secure',
      description: 'Education planning with guaranteed returns',
      confidence: 78,
      reason: 'Perfect for your children\'s future'
    },
    {
      title: 'Retirement Comfort Plus',
      description: 'Steady post-retirement income',
      confidence: 75,
      reason: 'Start early for comfortable retirement'
    },
    {
      title: 'Smart Income Shield',
      description: 'Income protection with disability coverage',
      confidence: 72,
      reason: 'Protects your earning capacity'
    }
  ];

const userDetails = {
    name: 'Vikaram Bose',
    customerId: 'SBI123456789',
    email: 'vikarambose@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Chennai, Tamil Naidu',
    branch: 'Chennai Main Branch',
    accountType: 'Savings Account',
    lastLogin: '2024-03-15 10:30 AM',
    prosperityScore: 570
  };

  // Investment Growth Prediction Data
  const investmentGrowthData = {
    labels: ['2024', '2025', '2026', '2027', '2028'],
    datasets: [
      {
        label: 'Conservative Growth',
        data: [100, 108, 117, 127, 138],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Aggressive Growth',
        data: [100, 115, 132, 152, 175],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Market Trend Analysis Data
  const marketTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Market Index',
        data: [65, 68, 72, 75, 82, 85],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Drawer */}
      <div className={`fixed inset-0 z-50 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsDrawerOpen(false)} />
        <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-lg">
          <div className="p-4 bg-purple-800 text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Profile</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1 hover:bg-purple-700 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-purple-800" />
              </div>
              <div>
                <h3 className="font-bold">{userDetails.name}</h3>
                <p className="text-sm opacity-80">Customer ID: {userDetails.customerId}</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-500">Contact Information</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm">Email: {userDetails.email}</p>
                <p className="text-sm">Phone: {userDetails.phone}</p>
                <p className="text-sm">Address: {userDetails.address}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">Banking Details</h4>
              <div className="mt-2 space-y-2">
                <p className="text-sm">Branch: {userDetails.branch}</p>
                <p className="text-sm">Account Type: {userDetails.accountType}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-500">Security</h4>
              <p className="text-sm mt-2">Last Login: {userDetails.lastLogin}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <nav className="bg-purple-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
              >
                <User size={24} className="text-purple-800" />
              </button>
              <span className="text-xl font-bold">Personalised Dashboard</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item, index) => (
                <button key={index} className="flex items-center space-x-1 hover:text-[#f1aeb5] transition-colors">
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for insurance plans, services, or information..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          
          {searchQuery && (
            <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Recent Searches</h3>
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => setSearchQuery(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="md:col-span-3 space-y-4">
            {/* Propensity Score */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-800">{propensityScore}</div>
                    <div className="text-sm text-gray-500">Propensity Score</div>
                  </div>
                </div>
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#7e22ce"
                    strokeWidth="8"
                    strokeDasharray={`${(propensityScore / 100) * 377} 377`}
                  />
                </svg>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Based on customer behavior and profile data</p>
                <div className="mt-2 text-xs text-gray-500">
                  <div className="flex justify-between items-center">
                    <span>Credit Score:</span>
                    <span className="font-medium">{customerData.creditScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Policies:</span>
                    <span className="font-medium">{customerData.activePolicies}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Engagement Rate:</span>
                    <span className="font-medium">{(customerData.emailResponseRate * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow p-4 space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-white">
                  <Activity size={16} />
                </div>
                <span>Propensity Score</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-white">
                  <FileText size={16} />
                </div>
                <span>Active Plans</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-white">
                  <CreditCard size={16} />
                </div>
                <span>Matured Plans</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-purple-50 flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#f1aeb5] rounded-full flex items-center justify-center text-white">
                  <Info size={16} />
                </div>
                <span>Pending Installments</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9 space-y-6">
            {/* AI Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Investment Growth Prediction</h3>
                <Line options={chartOptions} data={investmentGrowthData} />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Market Trend Analysis</h3>
                <Line options={chartOptions} data={marketTrendData} />
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-purple-800 mb-6">AI-Powered Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((item, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-purple-800">{item.title}</h3>
                      <span className="text-sm font-medium text-green-600">{item.confidence}% Match</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <p className="text-xs text-purple-600 italic">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}

export default App;