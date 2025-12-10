import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  Home, 
  UserCircle, 
  HelpCircle, 
  LogOut,
  CheckCircle,
  Users,
  FileText,
  BarChart3,
  Settings,
  FileCheck,
  XCircle,
  MapPin,
  DollarSign,
  Eye,
  MessageSquare,
  Image,
  Download,
  Clock,
  AlertCircle,
  AlertTriangle,
  ExternalLink,
  Send,
  Home as HomeIcon,
  Maximize,
  Building2,
  Bed,
  Bath,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../utils/supabase/AuthContext';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from './ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

interface AdminListingReviewsProps {
  onLogout: () => void;
}

export default function AdminListingReviews({ onLogout }: AdminListingReviewsProps) {
  const { user } = useAuth();
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [consentDialogOpen, setConsentDialogOpen] = useState(false);
  const [selectedConsent, setSelectedConsent] = useState<any>(null);
  const [adminFeedback, setAdminFeedback] = useState('');
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Approvals', path: '/admin/approvals', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Listing Reviews', path: '/admin/listing-reviews', icon: <FileText className="w-5 h-5" />, active: true },
    { label: 'Users & Assignments', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Documents', path: '/admin/documents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { label: 'Help & Support', path: '/admin/help', icon: <HelpCircle className="w-5 h-5" /> },
    { 
      label: 'Logout', 
      path: '/', 
      icon: <LogOut className="w-5 h-5" />,
    },
  ];

  const pendingListings = [
    {
      id: 1,
      title: 'Highland Ranch Estate',
      broker: 'John Smith',
      brokerage: 'Montana Estates',
      price: 12500000,
      acres: 450,
      location: 'Montana',
      propertyType: 'Ranch',
      status: 'New Submission',
      submitted: '2024-11-21 10:00 AM',
      consentVerified: true,
      photos: 24,
      documents: 8,
      description: 'Stunning 450-acre ranch with mountain views, working cattle operation, luxury main residence, guest house, and stables.',
      issues: []
    },
    {
      id: 2,
      title: 'Coastal Vineyard Property',
      broker: 'Maria Garcia',
      brokerage: 'California Land Co.',
      price: 8750000,
      acres: 120,
      location: 'California',
      propertyType: 'Vineyard',
      status: 'Revision Requested',
      submitted: '2024-11-20 02:30 PM',
      consentVerified: true,
      photos: 18,
      documents: 5,
      description: 'Established vineyard with premium coastal location, modern winery facilities, and luxury residence.',
      issues: ['Missing water rights documentation', 'Photos need higher resolution']
    },
    {
      id: 3,
      title: 'Mountain Retreat',
      broker: 'Robert Lee',
      brokerage: 'Wyoming Land Group',
      price: 6200000,
      acres: 280,
      location: 'Wyoming',
      propertyType: 'Residential Estate',
      status: 'New Submission',
      submitted: '2024-11-19 11:45 AM',
      consentVerified: false,
      photos: 16,
      documents: 6,
      description: 'Private mountain estate with panoramic views, custom log home, guest cabins, and year-round access.',
      issues: ['Consent-to-List document pending']
    },
  ];

  // Load listings on mount
  useEffect(() => {
    loadListings();
  }, [statusFilter]);

  const loadListings = async () => {
    try {
      setLoading(true);
      
      console.log('🔍 AdminListingReviews: Loading listings (USING STATIC DATA)...');
      console.log('🔍 Status filter:', statusFilter);
      
      // ✅ STATIC/MOCK DATA FOR TESTING
      const mockListings = [
        {
          id: '1',
          title: 'Highland Ranch Estate',
          property_type: 'Ranch',
          listing_type: 'sale',
          price: 12500000,
          acreage: 450,
          address: '1234 Mountain View Road',
          city: 'Bozeman',
          state: 'Montana',
          zip: '59715',
          county: 'Gallatin',
          latitude: 45.6797,
          longitude: -111.0447,
          status: 'pending',
          bedrooms: 5,
          bathrooms: 4,
          square_feet: 6500,
          year_built: 2018,
          features: ['Mountain Views', 'Guest House', 'Horse Stables', 'Cattle Operation', 'Private Lake', 'Hay Barn', 'Cattle Chutes', 'Irrigated Pastures'],
          description: 'Stunning 450-acre working cattle ranch with mountain views, luxury 5-bedroom main residence, guest house, horse stables, and modern cattle facilities. This exceptional property offers endless possibilities for ranching, recreation, or investment with year-round water rights and irrigated pastures.',
          images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
          ],
          broker_id: 'broker123',
          created_at: '2024-12-08T10:00:00Z',
          broker: {
            full_name: 'John Smith',
            email: 'john.smith@montanaestates.com',
            phone: '(406) 555-1234',
            license_number: 'MT-123456',
            brokerage: 'Montana Estates Realty'
          },
          client_consent: {
            id: 'consent1',
            client_name: 'Robert Johnson',
            status: 'verified',
            client_email: 'robert@email.com',
            client_phone: '(406) 555-0123',
            expires_at: '2025-06-01',
            document_url: 'https://example.com/consent1.pdf'
          },
          admin_notes: ''
        },
        {
          id: '2',
          title: 'Coastal Vineyard Estate',
          property_type: 'Other',
          listing_type: 'sale',
          price: 8750000,
          acreage: 120,
          address: '5678 Vineyard Lane',
          city: 'Napa',
          state: 'California',
          zip: '94558',
          county: 'Napa',
          latitude: 38.2975,
          longitude: -122.2869,
          status: 'under_review',
          bedrooms: 4,
          bathrooms: 3,
          square_feet: 5200,
          year_built: 2015,
          features: ['Working Vineyard', 'Premium Cabernet Grapes', 'Wine Cellar', 'Tasting Room', 'Winery Equipment', 'Barrel Storage', 'Estate Bottling Facility'],
          description: 'Established 120-acre premium vineyard with coastal location, modern winery facilities, and luxury 4-bedroom residence. Producing award-winning Cabernet Sauvignon with excellent production history and estate bottling capabilities. Includes all winery equipment, barrel storage, and tasting room.',
          images: [
            'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800'
          ],
          broker_id: 'broker456',
          created_at: '2024-12-07T14:30:00Z',
          broker: {
            full_name: 'Maria Garcia',
            email: 'maria@californialand.com',
            phone: '(707) 555-5678',
            license_number: 'CA-789012',
            brokerage: 'California Land Co.'
          },
          client_consent: {
            id: 'consent2',
            client_name: 'Sarah Williams',
            status: 'verified',
            client_email: 'sarah@email.com',
            client_phone: '(707) 555-0456',
            expires_at: '2025-05-15',
            document_url: 'https://example.com/consent2.pdf'
          },
          admin_notes: 'Need higher resolution photos and water rights documentation.'
        },
        {
          id: '3',
          title: 'Mountain Retreat Estate',
          property_type: 'House',
          listing_type: 'sale',
          price: 6200000,
          acreage: 280,
          address: '9012 Summit Drive',
          city: 'Jackson Hole',
          state: 'Wyoming',
          zip: '83001',
          county: 'Teton',
          latitude: 43.4799,
          longitude: -110.7624,
          status: 'pending',
          bedrooms: 6,
          bathrooms: 5,
          square_feet: 7800,
          year_built: 2020,
          features: ['Ski-In/Ski-Out Access', 'Helipad', 'Home Theater', 'Wine Cellar', 'Spa & Sauna', 'Heated Floors', 'Smart Home System', 'Mountain Views'],
          description: 'Private mountain estate with panoramic Teton views, custom 6-bedroom log home, guest cabins, and year-round access. Minutes from world-class skiing and recreation. Custom built with the finest materials including stone fireplaces, timber framing, and floor-to-ceiling windows.',
          images: [
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
          ],
          broker_id: 'broker789',
          created_at: '2024-12-06T11:45:00Z',
          broker: {
            full_name: 'Robert Lee',
            email: 'robert@wyomingland.com',
            phone: '(307) 555-9012',
            license_number: 'WY-345678',
            brokerage: 'Wyoming Land Group'
          },
          client_consent: {
            id: 'consent3',
            client_name: 'Michael Chen',
            status: 'pending',
            client_email: 'michael@email.com',
            client_phone: '(307) 555-0789',
            expires_at: '2025-07-01'
          },
          admin_notes: ''
        },
        {
          id: '4',
          title: 'Prime Development Land - Desert Valley',
          property_type: 'Land',
          listing_type: 'sale',
          price: 15000000,
          acreage: 800,
          address: '3456 Desert View Road',
          city: 'Scottsdale',
          state: 'Arizona',
          zip: '85262',
          county: 'Maricopa',
          latitude: 33.4942,
          longitude: -111.9261,
          status: 'need_more_docs',
          features: ['Highway Frontage', 'Utilities Available', 'Zoned for Residential', 'Mountain Views', 'Desert Landscape', 'Flat Terrain', 'Development Ready'],
          description: 'Exceptional 800-acre development opportunity in prime Scottsdale location. Highway frontage with utilities available. Zoned for residential development with stunning desert and mountain views. Perfect for master-planned community, resort development, or land banking. All permits and environmental studies available.',
          images: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800'
          ],
          broker_id: 'broker101',
          created_at: '2024-12-05T09:00:00Z',
          broker: {
            full_name: 'Jennifer Martinez',
            email: 'jennifer@arizonaland.com',
            phone: '(480) 555-3456',
            license_number: 'AZ-901234',
            brokerage: 'Arizona Land Properties'
          },
          client_consent: {
            id: 'consent4',
            client_name: 'David Thompson',
            status: 'pending',
            client_email: 'david@email.com',
            client_phone: '(480) 555-0101',
            expires_at: '2025-04-20'
          },
          admin_notes: 'Missing title documents and property survey.'
        },
        {
          id: '5',
          title: 'Lakefront Luxury Estate',
          property_type: 'House',
          listing_type: 'sale',
          price: 22000000,
          acreage: 65,
          address: '7890 Lakeshore Boulevard',
          city: 'Lake Tahoe',
          state: 'Nevada',
          zip: '89449',
          county: 'Douglas',
          latitude: 39.0968,
          longitude: -120.0324,
          status: 'pending',
          bedrooms: 8,
          bathrooms: 7,
          square_feet: 12000,
          year_built: 2021,
          features: ['300ft Private Beach', 'Private Boat Dock', 'Boat Lift', 'Smart Home Technology', 'Infinity Pool', 'Home Gym', 'Media Room', 'Guest House'],
          description: 'Extraordinary lakefront estate with 300 feet of pristine Lake Tahoe shoreline and private sandy beach. Stunning 8-bedroom main residence with floor-to-ceiling windows, gourmet kitchen, and unobstructed water views. Includes private boat dock with lift, guest house, infinity pool, and state-of-the-art smart home system. The ultimate in luxury lakeside living.',
          images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
            'https://images.unsplash.com/photo-1600047508788-786f47abe882?w=800',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800'
          ],
          broker_id: 'broker202',
          created_at: '2024-12-04T16:20:00Z',
          broker: {
            full_name: 'Thomas Anderson',
            email: 'thomas@laketahoeluxury.com',
            phone: '(775) 555-7890',
            license_number: 'NV-567890',
            brokerage: 'Lake Tahoe Luxury Properties'
          },
          client_consent: {
            id: 'consent5',
            client_name: 'Patricia White',
            status: 'verified',
            client_email: 'patricia@email.com',
            client_phone: '(775) 555-0202',
            expires_at: '2025-08-10',
            document_url: 'https://example.com/consent5.pdf'
          },
          admin_notes: ''
        },
        {
          id: '6',
          title: 'Historic Bluegrass Farm',
          property_type: 'Ranch',
          listing_type: 'sale',
          price: 4500000,
          acreage: 320,
          address: '2345 Heritage Road',
          city: 'Lexington',
          state: 'Kentucky',
          zip: '40511',
          county: 'Fayette',
          latitude: 38.0406,
          longitude: -84.5037,
          status: 'under_review',
          bedrooms: 5,
          bathrooms: 4,
          square_feet: 5800,
          year_built: 1890,
          features: ['Historic Farmhouse', '10-Stall Horse Barn', 'Equipment Storage', 'Rolling Pastures', 'Black Board Fencing', 'Creek & Pond', 'Tobacco Barn', 'Original Stone Walls'],
          description: 'Beautifully preserved historic 320-acre Bluegrass farm estate with original 1890 farmhouse, extensive barn complex, rolling pastures, and pristine black board fencing. Rich agricultural heritage with productive farmland, creek, and pond. Perfect for horse breeding, farming, or gentleman\'s estate. Includes equipment storage, 10-stall barn, and historic tobacco barn.',
          images: [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
            'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800'
          ],
          broker_id: 'broker303',
          created_at: '2024-12-03T13:15:00Z',
          broker: {
            full_name: 'Amanda Brooks',
            email: 'amanda@kentuckyfarms.com',
            phone: '(859) 555-2345',
            license_number: 'KY-234567',
            brokerage: 'Kentucky Farm Brokers'
          },
          client_consent: {
            id: 'consent6',
            client_name: 'James Miller',
            status: 'verified',
            client_email: 'james@email.com',
            client_phone: '(859) 555-0303',
            expires_at: '2025-05-30',
            document_url: 'https://example.com/consent6.pdf'
          },
          admin_notes: 'Please update historical designation paperwork.'
        },
        {
          id: '7',
          title: 'Downtown Luxury Penthouse',
          property_type: 'Condo',
          listing_type: 'rent',  // Changed to rent
          monthly_rent: 8500,  // Monthly rent instead of price
          security_deposit: 17000,
          lease_term_options: ['6 months', '1 year', '2 years'],
          utilities_included: ['Water', 'Trash'],
          utilities_not_included: ['Electricity', 'Gas', 'Internet'],
          pet_policy: 'Cats allowed with deposit',
          parking_included: true,
          furnished: false,
          available_date: '2025-01-15',
          address: '100 Park Avenue, Penthouse 42A',
          city: 'New York',
          state: 'New York',
          zip: '10016',
          county: 'New York',
          latitude: 40.7484,
          longitude: -73.9857,
          status: 'pending',
          bedrooms: 3,
          bathrooms: 3,
          square_feet: 3200,
          year_built: 2022,
          features: ['Floor-to-Ceiling Windows', 'Private Elevator', 'Skyline Views', 'Chef\'s Kitchen', 'Smart Home', 'Marble Bathrooms', 'Walk-In Closets', 'Concierge Service'],
          description: 'Stunning penthouse condominium in the heart of Manhattan with breathtaking skyline views. This luxurious 3-bedroom residence features floor-to-ceiling windows, custom Italian finishes, and private elevator access. Building amenities include 24-hour concierge, fitness center, rooftop terrace, and resident lounge. Perfect for upscale living with flexible lease terms.',
          images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
          ],
          broker_id: 'broker404',
          created_at: '2024-12-02T09:30:00Z',
          broker: {
            full_name: 'Lisa Chen',
            email: 'lisa@nycprestige.com',
            phone: '(212) 555-4567',
            license_number: 'NY-678901',
            brokerage: 'NYC Prestige Realty'
          },
          client_consent: {
            id: 'consent7',
            client_name: 'Alexander Morgan',
            status: 'pending',
            client_email: 'alex@email.com',
            client_phone: '(212) 555-0404',
            expires_at: '2025-06-15'
          },
          admin_notes: ''
        },
        {
          id: '8',
          title: 'Modern Waterfront Townhome',
          property_type: 'Townhome',
          listing_type: 'rent',  // Changed to rent
          monthly_rent: 6500,
          security_deposit: 13000,
          lease_term_options: ['1 year', '2 years'],
          utilities_included: ['Water', 'Sewer', 'Trash'],
          utilities_not_included: ['Electricity', 'Gas', 'Internet', 'Cable'],
          pet_policy: 'Dogs under 30lbs allowed with $500 deposit',
          parking_included: true,
          furnished: false,
          available_date: '2025-02-01',
          address: '456 Harbor Lane',
          city: 'San Francisco',
          state: 'California',
          zip: '94111',
          county: 'San Francisco',
          latitude: 37.7749,
          longitude: -122.4194,
          status: 'under_review',
          bedrooms: 4,
          bathrooms: 3,
          square_feet: 2800,
          year_built: 2021,
          features: ['Rooftop Deck', 'Water Views', 'Open Floor Plan', '2-Car Garage', 'Gourmet Kitchen', 'Hardwood Floors', 'Energy Efficient', 'Private Patio'],
          description: 'Contemporary 4-bedroom townhome with stunning bay views and modern finishes throughout. Open-concept living with chef\'s kitchen, rooftop deck perfect for entertaining, and private 2-car garage. Walking distance to shops, restaurants, and waterfront. Ideal for professionals seeking upscale rental in prime location.',
          images: [
            'https://images.unsplash.com/photo-1600047508796-3c0e6c1400b3?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
          ],
          broker_id: 'broker505',
          created_at: '2024-12-01T14:00:00Z',
          broker: {
            full_name: 'Michael Torres',
            email: 'michael@sfcoastal.com',
            phone: '(415) 555-6789',
            license_number: 'CA-345678',
            brokerage: 'SF Coastal Properties'
          },
          client_consent: {
            id: 'consent8',
            client_name: 'Jessica Park',
            status: 'verified',
            client_email: 'jessica@email.com',
            client_phone: '(415) 555-0505',
            expires_at: '2025-07-20',
            document_url: 'https://example.com/consent8.pdf'
          },
          admin_notes: 'Need updated HOA documents and financial statements.'
        },
        {
          id: '9',
          title: 'Downtown Investment Apartment Building',
          property_type: 'Apartment',
          listing_type: 'sale',
          price: 8900000,
          address: '789 Main Street',
          city: 'Austin',
          state: 'Texas',
          zip: '78701',
          county: 'Travis',
          latitude: 30.2672,
          longitude: -97.7431,
          status: 'pending',
          year_built: 2019,
          features: ['24 Units', 'Fully Occupied', 'On-Site Parking', 'Rooftop Amenities', 'Strong Cash Flow', 'Professional Management', 'Prime Location', 'Recent Renovations'],
          description: 'Exceptional 24-unit apartment building in downtown Austin with 100% occupancy and strong rental history. Modern construction with high-end finishes, on-site parking, and rooftop amenities. Currently professionally managed with excellent cash flow. Prime location near tech corridor and entertainment district.',
          images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
          ],
          broker_id: 'broker606',
          created_at: '2024-11-30T11:20:00Z',
          broker: {
            full_name: 'David Richardson',
            email: 'david@texasinvestments.com',
            phone: '(512) 555-8901',
            license_number: 'TX-456789',
            brokerage: 'Texas Investment Properties'
          },
          client_consent: {
            id: 'consent9',
            client_name: 'Summit Real Estate Holdings LLC',
            status: 'verified',
            client_email: 'contact@summitholdings.com',
            client_phone: '(512) 555-0606',
            expires_at: '2025-08-30',
            document_url: 'https://example.com/consent9.pdf'
          },
          admin_notes: ''
        },
        {
          id: '10',
          title: 'Luxury Multi-Family Investment Property',
          property_type: 'Multi-Family',
          listing_type: 'sale',
          price: 2750000,
          address: '321 Riverside Drive',
          city: 'Portland',
          state: 'Oregon',
          zip: '97209',
          county: 'Multnomah',
          latitude: 45.5152,
          longitude: -122.6784,
          status: 'need_more_docs',
          year_built: 2020,
          features: ['4-Unit Building', '3 Bed/2 Bath Each Unit', 'Separate Utilities', 'Private Balconies', 'Gated Parking', 'Modern Finishes', 'Low Maintenance', 'River Views'],
          description: 'Pristine 4-unit multi-family property with river views and exceptional rental income potential. Each unit features 3 bedrooms, 2 bathrooms, modern appliances, and private balconies. Separate utilities for each unit, gated parking, and low-maintenance exterior. Perfect for investors seeking strong returns in a desirable Portland neighborhood.',
          images: [
            'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
          ],
          broker_id: 'broker707',
          created_at: '2024-11-29T16:45:00Z',
          broker: {
            full_name: 'Rachel Green',
            email: 'rachel@pacificnw.com',
            phone: '(503) 555-2345',
            license_number: 'OR-567890',
            brokerage: 'Pacific NW Investments'
          },
          client_consent: {
            id: 'consent10',
            client_name: 'Portland Properties Group',
            status: 'pending',
            client_email: 'info@portlandproperties.com',
            client_phone: '(503) 555-0707',
            expires_at: '2025-04-10'
          },
          admin_notes: 'Missing rental income statements and tenant lease agreements.'
        }
      ];

      console.log('📊 Mock data loaded:', mockListings.length, 'listings');

      let filtered = mockListings;
      
      console.log('🔍 Before filter - listings count:', filtered.length);
      
      // Apply status filter
      if (statusFilter !== 'all') {
        filtered = filtered.filter(l => l.status === statusFilter);
        console.log(`🔍 After filtering by '${statusFilter}':`, filtered.length);
      }

      console.log('✅ Final listings to display:', filtered);
      setListings(filtered);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error: any) {
      console.error('❌ Error loading listings:', error);
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (listing: any) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const handleViewConsent = (listing: any) => {
    setSelectedConsent(listing.client_consent);
    setConsentDialogOpen(true);
  };

  const handleUpdateConsentStatus = async (consentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('client_consents')
        .update({ 
          status: newStatus,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', consentId);

      if (error) throw error;

      toast.success(`Consent ${newStatus === 'verified' ? 'verified' : 'rejected'}`);
      setConsentDialogOpen(false);
      loadListings(); // Reload to show updated status
    } catch (error: any) {
      console.error('Error updating consent:', error);
      toast.error('Failed to update consent status');
    }
  };

  const handleApprove = async (listingId: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'active',
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Listing approved and published!');
      setDialogOpen(false);
      loadListings();
    } catch (error: any) {
      console.error('Error approving listing:', error);
      toast.error('Failed to approve listing');
    }
  };

  const handleRequestRevision = async (listingId: string) => {
    if (!adminFeedback.trim()) {
      toast.error('Please provide feedback for the broker');
      return;
    }

    try {
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'under_review',
          admin_notes: adminFeedback,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Revision requested - Broker has been notified');
      setDialogOpen(false);
      setAdminFeedback('');
      loadListings();
    } catch (error: any) {
      console.error('Error requesting revision:', error);
      toast.error('Failed to request revision');
    }
  };

  const handleReject = async (listingId: string) => {
    if (!adminFeedback.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'need_more_docs',
          admin_notes: adminFeedback,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', listingId);

      if (error) throw error;

      toast.success('Listing rejected - Sent back to broker drafts');
      setDialogOpen(false);
      setAdminFeedback('');
      loadListings();
    } catch (error: any) {
      console.error('Error rejecting listing:', error);
      toast.error('Failed to reject listing');
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="admin" 
      userName="Admin"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-white mb-2">Listing Reviews</h1>
          <p className="text-gray-400">Review and approve submitted property listings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">New Submissions</p>
              <p className="text-white text-3xl">
                {listings.filter(l => l.status === 'pending').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Revisions Needed</p>
              <p className="text-white text-3xl">
                {listings.filter(l => l.status === 'under_review').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Verified</p>
              <p className="text-white text-3xl">
                {listings.filter(l => l.status === 'need_more_docs').length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Value</p>
              <p className="text-white text-2xl">
                ${listings.filter(l => l.price).reduce((sum, l) => sum + (l.price || 0), 0) > 0 
                  ? `${(listings.filter(l => l.price).reduce((sum, l) => sum + (l.price || 0), 0) / 1000000).toFixed(0)}M`
                  : '0'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Listing Reviews with Tabs */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
          <CardHeader>
            <CardTitle className="text-white">Listing Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
              <TabsList className="bg-[#0f0f0f] border-[#2a2a2a]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
                  All Listings ({listings.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  New Submission ({listings.filter(l => l.status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger value="under_review" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  Revision Requested ({listings.filter(l => l.status === 'under_review').length})
                </TabsTrigger>
                <TabsTrigger value="need_more_docs" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  Needs Docs ({listings.filter(l => l.status === 'need_more_docs').length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Debug Info - Remove this after testing */}
            {!loading && (
              <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-purple-400 text-sm">
                  🐛 <strong>Debug:</strong> Found {listings.length} listings. 
                  Status filter: <strong>{statusFilter}</strong>
                </p>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading listings...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No listings found</p>
              </div>
            ) : (
              <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Property</TableHead>
                  <TableHead className="text-gray-400">Broker</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Location</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Consent</TableHead>
                  <TableHead className="text-gray-400 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listings.map((listing) => {
                  const consentVerified = listing.client_consent?.status === 'verified';
                  const statusBadge = 
                    listing.status === 'pending' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                    listing.status === 'under_review' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    'bg-green-500/20 text-green-400 border-green-500/30';
                  
                  const statusLabel = 
                    listing.status === 'pending' ? 'New Submission' :
                    listing.status === 'under_review' ? 'Revision Requested' :
                    'Verified';

                  return (
                    <TableRow key={listing.id} className="border-[#2a2a2a] hover:bg-[#2a2a2a]/30">
                      <TableCell>
                        <div>
                          <p className="text-white mb-1">{listing.title}</p>
                          <div className="flex items-center gap-2 text-sm flex-wrap">
                            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                              {listing.property_type}
                            </Badge>
                            <Badge className={listing.listing_type === 'rent' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs' : 'bg-green-500/20 text-green-400 border-green-500/30 text-xs'}>
                              {listing.listing_type === 'rent' ? 'Rental' : 'Sale'}
                            </Badge>
                            {listing.acreage && (
                              <p className="text-gray-500">{listing.acreage} acres</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white">{listing.broker?.full_name || 'Unknown'}</p>
                          <p className="text-gray-400 text-sm">{listing.broker?.email || ''}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#d4af37]">
                        {listing.listing_type === 'rent' 
                          ? `$${listing.monthly_rent?.toLocaleString()}/mo` 
                          : listing.price 
                            ? `$${(listing.price / 1000000).toFixed(1)}M` 
                            : 'Call for Pricing'
                        }
                      </TableCell>
                      <TableCell className="text-white">{listing.city}, {listing.state}</TableCell>
                      <TableCell>
                        <Badge className={statusBadge}>
                          {statusLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {consentVerified ? (
                          <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Verified</span>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleViewConsent(listing)}
                          >
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">Not Verified</span>
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-[#2a2a2a] hover:bg-[#2a2a2a]"
                            onClick={() => handleViewDetails(listing)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {consentVerified && (
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white"
                              onClick={() => handleApprove(listing.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Listing Review</DialogTitle>
              <DialogDescription className="text-gray-400">
                Review property details and documentation
              </DialogDescription>
            </DialogHeader>
            
            {selectedListing && (
              <div className="space-y-6 py-4">
                {/* Property Overview */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Property Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Title</p>
                      <p className="text-white text-lg">{selectedListing.title}</p>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Property Type</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white">{selectedListing.property_type}</p>
                        <Badge className={selectedListing.listing_type === 'rent' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs' : 'bg-green-500/20 text-green-400 border-green-500/30 text-xs'}>
                          {selectedListing.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">
                        {selectedListing.listing_type === 'rent' ? 'Monthly Rent' : 'Price'}
                      </p>
                      <p className="text-[#d4af37] text-xl">
                        {selectedListing.listing_type === 'rent' 
                          ? `$${selectedListing.monthly_rent?.toLocaleString()}/mo`
                          : `$${(selectedListing.price / 1000000).toFixed(1)}M`
                        }
                      </p>
                    </div>
                    {selectedListing.acreage && (
                      <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                        <p className="text-gray-400 text-sm mb-1">Acreage</p>
                        <p className="text-white">{selectedListing.acreage} acres</p>
                      </div>
                    )}
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Location</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#d4af37]" />
                        <p className="text-white">{selectedListing.city}, {selectedListing.state}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Submitted</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-white text-sm">{new Date(selectedListing.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Broker Information */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Broker Information</h3>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Broker Name</p>
                        <p className="text-white">{selectedListing.broker?.full_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Brokerage</p>
                        <p className="text-white">{selectedListing.broker?.brokerage}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <p className="text-white text-sm">{selectedListing.broker?.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Phone</p>
                        <p className="text-white">{selectedListing.broker?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Property Description</h3>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-300 leading-relaxed">{selectedListing.description}</p>
                  </div>
                </div>

                {/* Property Images */}
                {selectedListing.images && selectedListing.images.length > 0 && (
                  <div>
                    <h3 className="text-white mb-3 text-lg flex items-center gap-2">
                      <Image className="w-5 h-5 text-blue-500" />
                      Property Images ({selectedListing.images.length} photos)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedListing.images.map((img: string, idx: number) => (
                        <div key={idx} className="relative h-48 rounded-lg overflow-hidden border border-[#2a2a2a] group">
                          <img 
                            src={img} 
                            alt={`Property ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            Photo {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Property Details Grid */}
                {(selectedListing.bedrooms || selectedListing.bathrooms || selectedListing.square_feet || selectedListing.year_built) && (
                  <div>
                    <h3 className="text-white mb-3 text-lg flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-purple-500" />
                      Property Specifications
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                      {selectedListing.bedrooms && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <div className="flex items-center gap-2 mb-2">
                            <Bed className="w-4 h-4 text-blue-500" />
                            <p className="text-gray-400 text-sm">Bedrooms</p>
                          </div>
                          <p className="text-white text-2xl">{selectedListing.bedrooms}</p>
                        </div>
                      )}
                      {selectedListing.bathrooms && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <div className="flex items-center gap-2 mb-2">
                            <Bath className="w-4 h-4 text-green-500" />
                            <p className="text-gray-400 text-sm">Bathrooms</p>
                          </div>
                          <p className="text-white text-2xl">{selectedListing.bathrooms}</p>
                        </div>
                      )}
                      {selectedListing.square_feet && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <div className="flex items-center gap-2 mb-2">
                            <Maximize className="w-4 h-4 text-purple-500" />
                            <p className="text-gray-400 text-sm">Sq. Ft.</p>
                          </div>
                          <p className="text-white text-lg">{selectedListing.square_feet.toLocaleString()}</p>
                        </div>
                      )}
                      {selectedListing.year_built && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-yellow-500" />
                            <p className="text-gray-400 text-sm">Year Built</p>
                          </div>
                          <p className="text-white text-lg">{selectedListing.year_built}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Rental Terms - Only for Rental Listings */}
                {selectedListing.listing_type === 'rent' && (
                  <div>
                    <h3 className="text-white mb-3 text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-500" />
                      Rental Terms & Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedListing.security_deposit && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Security Deposit</p>
                          <p className="text-[#d4af37] text-lg">${selectedListing.security_deposit.toLocaleString()}</p>
                        </div>
                      )}
                      {selectedListing.available_date && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Available Date</p>
                          <p className="text-white">{new Date(selectedListing.available_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      {selectedListing.lease_term_options && selectedListing.lease_term_options.length > 0 && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] col-span-2">
                          <p className="text-gray-400 text-sm mb-2">Lease Term Options</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedListing.lease_term_options.map((term: string, idx: number) => (
                              <Badge 
                                key={idx}
                                className="bg-blue-500/10 text-blue-400 border-blue-500/30"
                              >
                                {term}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedListing.pet_policy && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Pet Policy</p>
                          <p className="text-white">{selectedListing.pet_policy}</p>
                        </div>
                      )}
                      {selectedListing.parking_included !== undefined && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Parking</p>
                          <p className="text-white">{selectedListing.parking_included ? 'Included' : 'Not Included'}</p>
                        </div>
                      )}
                      {selectedListing.furnished !== undefined && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-1">Furnished</p>
                          <p className="text-white">{selectedListing.furnished ? 'Yes' : 'Unfurnished'}</p>
                        </div>
                      )}
                      {(selectedListing.utilities_included && selectedListing.utilities_included.length > 0) && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-2">Utilities Included</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedListing.utilities_included.map((util: string, idx: number) => (
                              <Badge 
                                key={idx}
                                className="bg-green-500/10 text-green-400 border-green-500/30 text-xs"
                              >
                                ✓ {util}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {(selectedListing.utilities_not_included && selectedListing.utilities_not_included.length > 0) && (
                        <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                          <p className="text-gray-400 text-sm mb-2">Utilities Not Included</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedListing.utilities_not_included.map((util: string, idx: number) => (
                              <Badge 
                                key={idx}
                                className="bg-gray-500/10 text-gray-400 border-gray-500/30 text-xs"
                              >
                                {util}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features & Amenities */}
                {selectedListing.features && selectedListing.features.length > 0 && (
                  <div>
                    <h3 className="text-white mb-3 text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Features &amp; Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedListing.features.map((feature: string, idx: number) => (
                        <Badge 
                          key={idx}
                          className="bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/30 px-3 py-1"
                        >
                          ✓ {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Notes (if any) */}
                {selectedListing.admin_notes && selectedListing.admin_notes.trim().length > 0 && (
                  <div>
                    <h3 className="text-white mb-3 text-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                      Previous Admin Notes
                    </h3>
                    <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/30">
                      <p className="text-yellow-300">{selectedListing.admin_notes}</p>
                    </div>
                  </div>
                )}

                {/* Consent Status */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Client Consent Status</h3>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    {selectedListing.client_consent?.status === 'verified' ? (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="text-green-400">Consent Verified</p>
                          <p className="text-sm text-gray-400">Client: {selectedListing.client_consent?.client_name}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-red-400">Consent Not Verified</p>
                            <p className="text-sm text-gray-400">Client: {selectedListing.client_consent?.client_name || 'N/A'}</p>
                          </div>
                        </div>
                        {selectedListing.client_consent && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewConsent(selectedListing)}
                            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          >
                            <FileCheck className="w-4 h-4 mr-2" />
                            Review Consent
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Feedback */}
                <div>
                  <h3 className="text-white mb-3 text-lg">Admin Feedback</h3>
                  <Textarea 
                    value={adminFeedback}
                    onChange={(e) => setAdminFeedback(e.target.value)}
                    placeholder="Add feedback or revision requests for the broker..."
                    className="bg-[#0f0f0f] border-[#2a2a2a] text-white min-h-[100px]"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  {selectedListing.client_consent?.status === 'verified' ? (
                    <>
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleApprove(selectedListing.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve &amp; Publish Listing
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        onClick={() => handleRequestRevision(selectedListing.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Revision
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleReject(selectedListing.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 p-4 bg-red-500/5 rounded-lg border border-red-500/30">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-400 mb-2">Consent Not Verified</p>
                            <p className="text-gray-400 text-sm">
                              Review and verify the consent-to-list document before approving this listing.
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                        onClick={() => handleRequestRevision(selectedListing.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Revision
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleReject(selectedListing.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Consent Review Modal */}
        <Dialog open={consentDialogOpen} onOpenChange={setConsentDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">Review Consent-to-List Agreement</DialogTitle>
              <DialogDescription className="text-gray-400">
                Review and verify the client's consent to list this property
              </DialogDescription>
            </DialogHeader>
            
            {selectedConsent && (
              <div className="space-y-6 py-4">
                {/* Consent Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Client Name</p>
                    <p className="text-white">{selectedConsent.client_name}</p>
                  </div>
                  <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                    <p className="text-gray-400 text-sm mb-1">Current Status</p>
                    <Badge className={
                      selectedConsent.status === 'verified' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }>
                      {selectedConsent.status === 'verified' ? 'Verified' : 'Not Verified'}
                    </Badge>
                  </div>
                  {selectedConsent.client_email && (
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Email</p>
                      <p className="text-white text-sm">{selectedConsent.client_email}</p>
                    </div>
                  )}
                  {selectedConsent.client_phone && (
                    <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <p className="text-gray-400 text-sm mb-1">Phone</p>
                      <p className="text-white text-sm">{selectedConsent.client_phone}</p>
                    </div>
                  )}
                </div>

                {/* Document Viewer */}
                <div>
                  <Label className="text-white mb-2 block">Consent Document</Label>
                  <div className="p-6 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] text-center">
                    {selectedConsent.document_url ? (
                      <>
                        <FileCheck className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
                        <p className="text-white mb-2">Consent Document Available</p>
                        <p className="text-gray-400 text-sm mb-4">Click below to download and review the document</p>
                        <Button
                          variant="outline"
                          className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          onClick={() => window.open(selectedConsent.document_url, '_blank')}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Document
                        </Button>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                        <p className="text-red-400">No document uploaded</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Expiration Info */}
                {selectedConsent.expires_at && (
                  <Alert className="bg-blue-500/10 border-blue-500/30">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <AlertDescription className="text-blue-400">
                      This consent will expire on {new Date(selectedConsent.expires_at).toLocaleDateString()}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a2a]">
                  {selectedConsent.status !== 'verified' ? (
                    <>
                      <Button 
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleUpdateConsentStatus(selectedConsent.id, 'verified')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Verify Consent
                      </Button>
                      <Button 
                        variant="outline"
                        className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                        onClick={() => handleUpdateConsentStatus(selectedConsent.id, 'not_verified')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject - Request More Docs
                      </Button>
                    </>
                  ) : (
                    <Alert className="flex-1 bg-green-500/10 border-green-500/30">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <AlertDescription className="text-green-400">
                        This consent has been verified. The listing can now be approved.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
