import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, Users, FileText, UserCircle, HelpCircle, LogOut, Upload, MapPin, DollarSign, Maximize, Tag, Image, FileCheck, Save, Send, Plus, X, AlertCircle, CheckCircle2, Download, Building2, TreePine, Warehouse, Castle, Mail, Phone, AlertTriangle, Clock } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../utils/supabase/AuthContext';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface BrokerAddListingProps {
  onLogout: () => void;
}

export default function BrokerAddListing({ onLogout }: BrokerAddListingProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Single Listing State
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState<'sale' | 'rent'>('sale');
  const [features, setFeatures] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  
  // Basic Form Fields State - ADDED THE MISSING VARIABLES
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [acreage, setAcreage] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [county, setCounty] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sqft, setSqft] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [yearBuilt, setYearBuilt] = useState('');
  
  // Sale-specific fields
  const [hoaFees, setHoaFees] = useState('');
  
  // Rent-specific fields
  const [deposit, setDeposit] = useState('');
  const [leaseTerm, setLeaseTerm] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [petPolicy, setPetPolicy] = useState('');
  
  // Land/Ranch specific
  const [parcelNumber, setParcelNumber] = useState('');
  const [zoning, setZoning] = useState('');
  const [roadAccess, setRoadAccess] = useState('');
  const [topography, setTopography] = useState('');
  
  // Unit-specific (condos)
  const [unitNumber, setUnitNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  
  // Multi-family
  const [totalUnits, setTotalUnits] = useState('');
  
  // NEW: House-specific fields
  const [garageType, setGarageType] = useState('');
  const [garageSpaces, setGarageSpaces] = useState('');
  const [stories, setStories] = useState('');
  
  // NEW: Condo-specific fields
  const [condoView, setCondoView] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState('');
  
  // NEW: Multi-family specific
  const [unitMix, setUnitMix] = useState('');
  const [grossIncome, setGrossIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [capRate, setCapRate] = useState('');
  
  // Client Consent State
  const [approvedClients, setApprovedClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [addingNewClient, setAddingNewClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [consentFile, setConsentFile] = useState<File | null>(null);
  const [loadingClients, setLoadingClients] = useState(false);
  
  // Multiple Tracts State
  const [hasMultipleTracts, setHasMultipleTracts] = useState(false);
  const [tracts, setTracts] = useState<any[]>([
    { name: 'Tract 1', acres: '', zoning: '', price: '', callForPricing: false, use: '' }
  ]);
  const [totalCombinedAcres, setTotalCombinedAcres] = useState('');
  
  // Bulk Upload State
  const [batchName, setBatchName] = useState('');
  const [batchPropertyType, setBatchPropertyType] = useState('single');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [uploadErrors, setUploadErrors] = useState<any[]>([]);

  // Load approved clients on mount
  useEffect(() => {
    loadApprovedClients();
  }, [user]);

  const loadApprovedClients = async () => {
    if (!user) return;
    
    try {
      setLoadingClients(true);
      const { data, error } = await supabase
        .rpc('get_broker_approved_clients', { p_broker_id: user.id });

      if (error) throw error;

      // ONLY show VERIFIED consents (not just approved)
      const verifiedClients = (data || []).filter((client: any) => 
        client.status === 'verified' && !client.is_expired
      );
      
      setApprovedClients(verifiedClients);
    } catch (error: any) {
      console.error('Error loading approved clients:', error);
      toast.error('Failed to load approved clients');
    } finally {
      setLoadingClients(false);
    }
  };

  const sidebarItems = [
    { label: 'Dashboard', path: '/broker/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'My Listings', path: '/broker/listings', icon: <Home className="w-5 h-5" /> },
    { label: 'Add Listing', path: '/broker/add-listing', icon: <Home className="w-5 h-5" />, active: true },
    { label: 'Client Consents', path: '/broker/consents', icon: <FileCheck className="w-5 h-5" /> },
    { label: 'Leads', path: '/broker/leads', icon: <Users className="w-5 h-5" /> },
    { label: "My Buyer's List", path: '/broker/buyers', icon: <Users className="w-5 h-5" /> },
    { label: 'My Contracts', path: '/broker/contracts', icon: <FileText className="w-5 h-5" /> },
    { label: 'My NDAs', path: '/broker/ndas', icon: <FileText className="w-5 h-5" /> },
    { label: 'Invitations', path: '/broker/invitations', icon: <FileText className="w-5 h-5" /> },
    { label: 'Marketplace', path: '/broker/marketplace', icon: <Home className="w-5 h-5" /> },
    { label: 'My Documents', path: '/broker/documents', icon: <FileText className="w-5 h-5" /> },
    { label: 'My Profile', path: '/broker/profile', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Account', path: '/broker/account', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Settings', path: '/broker/settings', icon: <UserCircle className="w-5 h-5" /> },
    { label: 'Request Help', path: '/broker/help', icon: <HelpCircle className="w-5 h-5" /> },
    { label: 'Logout', path: '/', icon: <LogOut className="w-5 h-5" /> },
  ];

  const propertyTypes = [
    { value: 'house', label: 'House', icon: <Home className="w-4 h-4" /> },
    { value: 'condo', label: 'Condo', icon: <Building2 className="w-4 h-4" /> },
    { value: 'townhome', label: 'Townhome', icon: <Building2 className="w-4 h-4" /> },
    { value: 'apartment', label: 'Apartment', icon: <Building2 className="w-4 h-4" /> },
    { value: 'multi_family', label: 'Multi-Family', icon: <Building2 className="w-4 h-4" /> },
    { value: 'land', label: 'Land', icon: <TreePine className="w-4 h-4" /> },
    { value: 'ranch', label: 'Ranch', icon: <Warehouse className="w-4 h-4" /> },
    { value: 'other', label: 'Other', icon: <Castle className="w-4 h-4" /> },
  ];

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter(f => f !== feature));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(amenities.filter(a => a !== amenity));
  };

  // Multiple Tracts Functions
  const addTract = () => {
    setTracts([...tracts, { 
      name: `Tract ${tracts.length + 1}`, 
      acres: '', 
      zoning: '', 
      price: '', 
      callForPricing: false, 
      use: '' 
    }]);
  };

  const removeTract = (index: number) => {
    if (tracts.length > 1) {
      setTracts(tracts.filter((_, i) => i !== index));
    }
  };

  const updateTract = (index: number, field: string, value: any) => {
    const updatedTracts = [...tracts];
    updatedTracts[index][field] = value;
    setTracts(updatedTracts);
    
    // Auto-calculate total combined acres
    const total = updatedTracts.reduce((sum, tract) => {
      const acres = parseFloat(tract.acres) || 0;
      return sum + acres;
    }, 0);
    setTotalCombinedAcres(total > 0 ? total.toFixed(2) : '');
  };

  const prepareListingData = async (status: string, consentId?: string) => {
    return {
      broker_id: user!.id,
      client_consent_id: consentId || selectedClient,
      title,
      description,
      property_type: propertyType,
      listing_type: listingType, // ← Add listing type (sale or rent)
      
      // Price fields - use correct one based on listing type
      price: listingType === 'sale' && price ? parseFloat(price) : null,
      rent_price: listingType === 'rent' && price ? parseFloat(price) : null,
      
      // Location
      address,
      city,
      state,
      zip: zipCode,
      county,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      
      // Universal property details
      beds: bedrooms ? parseInt(bedrooms) : null,
      baths: bathrooms ? parseFloat(bathrooms) : null,
      sqft: sqft ? parseInt(sqft) : null,
      lot_size: lotSize ? parseFloat(lotSize) : null,
      year_built: yearBuilt ? parseInt(yearBuilt) : null,
      acreage: acreage ? parseFloat(acreage) : null,
      
      // Sale-specific
      hoa_fees: hoaFees ? parseFloat(hoaFees) : null,
      
      // Rent-specific (if listingType === 'rent')
      deposit: deposit ? parseFloat(deposit) : null,
      lease_term: leaseTerm || null,
      available_date: availableDate || null,
      pet_policy: petPolicy || null,
      
      // Land/Ranch specific
      parcel_number: parcelNumber || null,
      zoning: zoning || null,
      road_access: roadAccess || null,
      topography: topography || null,
      
      // Unit-specific (condos)
      unit_number: unitNumber || null,
      floor_number: floorNumber ? parseInt(floorNumber) : null,
      
      // Multi-family
      total_units: totalUnits ? parseInt(totalUnits) : null,
      
      // Features and amenities
      features,
      amenities,
      
      // Property-specific details (JSONB object)
      property_details: {
        // House-specific
        ...(propertyType === 'house' && {
          garage_type: garageType || null,
          garage_spaces: garageSpaces ? parseInt(garageSpaces) : null,
          stories: stories ? parseInt(stories) : null,
        }),
        // Condo-specific
        ...(propertyType === 'condo' && {
          view: condoView || null,
          parking_spaces: parkingSpaces ? parseInt(parkingSpaces) : null,
        }),
        // Multi-family specific
        ...(propertyType === 'multi_family' && {
          unit_mix: unitMix || null,
          gross_income: grossIncome ? parseFloat(grossIncome) : null,
          expenses: expenses ? parseFloat(expenses) : null,
          cap_rate: capRate ? parseFloat(capRate) : null,
        }),
      },
      
      // Status
      status,
    };
  };

  const handleSaveDraft = async () => {
    try {
      const listingData = await prepareListingData('draft');
      
      const { data, error } = await supabase
        .from('listings')
        .insert([listingData])
        .select()
        .single();

      if (error) throw error;

      toast.success('Listing saved as draft');
      navigate('/broker/listings');
    } catch (error: any) {
      console.error('Error saving draft:', error);
      toast.error(error.message || 'Failed to save draft');
    }
  };

  const handleSubmitForReview = async () => {
    try {
      // Validate required fields
      if (!title.trim()) {
        toast.error('Property title is required');
        return;
      }

      if (!selectedClient && !addingNewClient) {
        toast.error('Please select a client or add a new client with consent');
        return;
      }

      if (addingNewClient && !newClientName.trim()) {
        toast.error('Client name is required');
        return;
      }

      if (addingNewClient && !consentFile) {
        toast.error('Consent document is required for new clients');
        return;
      }

      let consentId = selectedClient;

      // If adding new client, create consent record first
      if (addingNewClient) {
        // Upload consent document to storage
        const fileExt = consentFile!.name.split('.').pop();
        const fileName = `${user!.id}-${Date.now()}.${fileExt}`;
        const filePath = `consents/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, consentFile!);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        // Create consent record
        const { data: consentData, error: consentError } = await supabase
          .from('client_consents')
          .insert([{
            broker_id: user!.id,
            client_name: newClientName,
            client_email: newClientEmail || null,
            client_phone: newClientPhone || null,
            document_url: publicUrl,
            status: 'not_verified',
            expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          }])
          .select()
          .single();

        if (consentError) throw consentError;
        consentId = consentData.id;
      }

      // Create listing
      const listingData = await prepareListingData('pending', consentId);
      
      const { data, error } = await supabase
        .from('listings')
        .insert([listingData])
        .select()
        .single();

      if (error) throw error;

      toast.success('Listing submitted for review!');
      navigate('/broker/listings');
    } catch (error: any) {
      console.error('Error submitting listing:', error);
      toast.error(error.message || 'Failed to submit listing');
    }
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      // Mock preview data
      setCsvPreview([
        { order: 1, title: 'Tower Unit 101', type: 'condo', price: '425K', status: 'valid' },
        { order: 2, title: 'Tower Unit 102', type: 'condo', price: '575K', status: 'valid' },
        { order: 3, title: 'Tower Unit 103', type: 'condo', price: '425K', status: 'warning' },
        { order: 4, title: 'Tower Unit 104', type: 'condo', price: '650K', status: 'valid' },
        { order: 5, title: 'Tower Unit 105', type: 'condo', price: '425K', status: 'error' },
      ]);
      setUploadErrors([
        { row: 3, message: 'Missing optional field: HOA fees' },
        { row: 5, message: 'Duplicate address detected' },
      ]);
    }
  };

  const downloadTemplate = (type: string) => {
    alert(`Downloading ${type} CSV template...`);
  };

  // Render dynamic fields based on property type
  const renderPropertyTypeFields = () => {
    if (!propertyType) return null;

    // HOUSE-SPECIFIC FIELDS
    if (propertyType === 'house') {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Garage Type</Label>
              <Select value={garageType} onValueChange={setGarageType}>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="attached">Attached</SelectItem>
                  <SelectItem value="detached">Detached</SelectItem>
                  <SelectItem value="carport">Carport</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Garage Spaces</Label>
              <Input
                type="number"
                value={garageSpaces}
                onChange={(e) => setGarageSpaces(e.target.value)}
                placeholder="2"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Stories</Label>
              <Input
                type="number"
                value={stories}
                onChange={(e) => setStories(e.target.value)}
                placeholder="2"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            {listingType === 'sale' && (
              <div>
                <Label className="text-gray-400 text-sm">HOA Fees ($/month)</Label>
                <Input
                  type="number"
                  value={hoaFees}
                  onChange={(e) => setHoaFees(e.target.value)}
                  placeholder="350"
                  className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="pool"
                checked={features.includes('pool')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFeatures([...features, 'pool']);
                  } else {
                    setFeatures(features.filter(f => f !== 'pool'));
                  }
                }}
              />
              <Label htmlFor="pool" className="text-gray-400 text-sm cursor-pointer">Pool</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="fireplace"
                checked={features.includes('fireplace')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFeatures([...features, 'fireplace']);
                  } else {
                    setFeatures(features.filter(f => f !== 'fireplace'));
                  }
                }}
              />
              <Label htmlFor="fireplace" className="text-gray-400 text-sm cursor-pointer">Fireplace</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="basement"
                checked={features.includes('basement')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFeatures([...features, 'basement']);
                  } else {
                    setFeatures(features.filter(f => f !== 'basement'));
                  }
                }}
              />
              <Label htmlFor="basement" className="text-gray-400 text-sm cursor-pointer">Basement</Label>
            </div>
          </div>
        </>
      );
    }

    // CONDO-SPECIFIC FIELDS
    if (propertyType === 'condo') {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Unit Number *</Label>
              <Input
                value={unitNumber}
                onChange={(e) => setUnitNumber(e.target.value)}
                placeholder="e.g., 302"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Floor Number</Label>
              <Input
                type="number"
                value={floorNumber}
                onChange={(e) => setFloorNumber(e.target.value)}
                placeholder="3"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">HOA Fees ($/month) * {listingType === 'sale' && <span className="text-red-400">Required for condos</span>}</Label>
              <Input
                type="number"
                value={hoaFees}
                onChange={(e) => setHoaFees(e.target.value)}
                placeholder="450"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">View</Label>
              <Select value={condoView} onValueChange={setCondoView}>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="mountain">Mountain</SelectItem>
                  <SelectItem value="courtyard">Courtyard</SelectItem>
                  <SelectItem value="none">No View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Building Amenities</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="pool-amenity"
                  checked={amenities.includes('pool')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAmenities([...amenities, 'pool']);
                    } else {
                      setAmenities(amenities.filter(a => a !== 'pool'));
                    }
                  }}
                />
                <Label htmlFor="pool-amenity" className="text-gray-400 text-sm cursor-pointer">Pool</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="gym-amenity"
                  checked={amenities.includes('gym')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAmenities([...amenities, 'gym']);
                    } else {
                      setAmenities(amenities.filter(a => a !== 'gym'));
                    }
                  }}
                />
                <Label htmlFor="gym-amenity" className="text-gray-400 text-sm cursor-pointer">Gym</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="concierge-amenity"
                  checked={amenities.includes('concierge')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAmenities([...amenities, 'concierge']);
                    } else {
                      setAmenities(amenities.filter(a => a !== 'concierge'));
                    }
                  }}
                />
                <Label htmlFor="concierge-amenity" className="text-gray-400 text-sm cursor-pointer">Concierge</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="rooftop-amenity"
                  checked={amenities.includes('rooftop_deck')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setAmenities([...amenities, 'rooftop_deck']);
                    } else {
                      setAmenities(amenities.filter(a => a !== 'rooftop_deck'));
                    }
                  }}
                />
                <Label htmlFor="rooftop-amenity" className="text-gray-400 text-sm cursor-pointer">Rooftop Deck</Label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                id="corner-unit"
                checked={features.includes('corner_unit')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFeatures([...features, 'corner_unit']);
                  } else {
                    setFeatures(features.filter(f => f !== 'corner_unit'));
                  }
                }}
              />
              <Label htmlFor="corner-unit" className="text-gray-400 text-sm cursor-pointer">Corner Unit</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="high-floor"
                checked={features.includes('high_floor')}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFeatures([...features, 'high_floor']);
                  } else {
                    setFeatures(features.filter(f => f !== 'high_floor'));
                  }
                }}
              />
              <Label htmlFor="high-floor" className="text-gray-400 text-sm cursor-pointer">High Floor</Label>
            </div>
          </div>
        </>
      );
    }

    // LAND-SPECIFIC FIELDS
    if (propertyType === 'land') {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Parcel Number (APN)</Label>
              <Input
                value={parcelNumber}
                onChange={(e) => setParcelNumber(e.target.value)}
                placeholder="12345-678-90"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Zoning</Label>
              <Input
                value={zoning}
                onChange={(e) => setZoning(e.target.value)}
                placeholder="Residential, Commercial, etc."
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Topography</Label>
              <Select value={topography} onValueChange={setTopography}>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select topography" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="rolling">Rolling</SelectItem>
                  <SelectItem value="hilly">Hilly</SelectItem>
                  <SelectItem value="mountainous">Mountainous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Road Access</Label>
              <Select value={roadAccess} onValueChange={setRoadAccess}>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select access" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="paved">Paved</SelectItem>
                  <SelectItem value="gravel">Gravel</SelectItem>
                  <SelectItem value="dirt">Dirt</SelectItem>
                  <SelectItem value="easement">Easement Required</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Utilities Available</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="electric" />
                <Label htmlFor="electric" className="text-gray-400 text-sm cursor-pointer">Electric</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="water" />
                <Label htmlFor="water" className="text-gray-400 text-sm cursor-pointer">Water</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="gas" />
                <Label htmlFor="gas" className="text-gray-400 text-sm cursor-pointer">Gas</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="sewer" />
                <Label htmlFor="sewer" className="text-gray-400 text-sm cursor-pointer">Sewer</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="septic-ready" />
                <Label htmlFor="septic-ready" className="text-gray-400 text-sm cursor-pointer">Septic Ready</Label>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="buildable" />
              <Label htmlFor="buildable" className="text-gray-400 text-sm cursor-pointer">Buildable</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="perc-test" />
              <Label htmlFor="perc-test" className="text-gray-400 text-sm cursor-pointer">Perc Test Passed</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="survey" />
              <Label htmlFor="survey" className="text-gray-400 text-sm cursor-pointer">Survey Available</Label>
            </div>
          </div>

          {/* Multiple Tracts Section */}
          <div className="border-t border-[#2a2a2a] pt-6 mt-4">
            <div className="flex items-center gap-3 mb-4">
              <Checkbox 
                id="multiple-tracts-land" 
                checked={hasMultipleTracts}
                onCheckedChange={(checked) => setHasMultipleTracts(!!checked)}
              />
              <Label htmlFor="multiple-tracts-land" className="text-white cursor-pointer">
                This property has multiple tracts/parcels
              </Label>
            </div>

            {hasMultipleTracts && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    💡 Perfect for properties like "Bolton Ranch" with Ranch Tract (±1,369 acres) + Commercial Tract (±391 acres)
                  </p>
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">Total Combined Acreage</Label>
                  <Input
                    value={totalCombinedAcres}
                    readOnly
                    placeholder="Auto-calculated from tracts below"
                    className="mt-2 bg-[#1a1a1a] border-[#2a2a2a] text-[#d4af37] placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-4">
                  {tracts.map((tract, index) => (
                    <div key={index} className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-white">{tract.name}</Label>
                        {tracts.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTract(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-400 text-xs">Tract Name</Label>
                          <Input
                            value={tract.name}
                            onChange={(e) => updateTract(index, 'name', e.target.value)}
                            placeholder="e.g., Ranch Tract, Commercial Tract"
                            className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-400 text-xs">Acreage *</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={tract.acres}
                            onChange={(e) => updateTract(index, 'acres', e.target.value)}
                            placeholder="1369.62"
                            className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-400 text-xs">Zoning</Label>
                          <Select value={tract.zoning} onValueChange={(val) => updateTract(index, 'zoning', val)}>
                            <SelectTrigger className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white">
                              <SelectValue placeholder="Select zoning" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="agricultural">Agricultural</SelectItem>
                              <SelectItem value="mixed">Mixed Use</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-gray-400 text-xs">Use/Purpose</Label>
                          <Input
                            value={tract.use}
                            onChange={(e) => updateTract(index, 'use', e.target.value)}
                            placeholder="e.g., Ranching, Future Development"
                            className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={`call-for-pricing-${index}`}
                              checked={tract.callForPricing}
                              onCheckedChange={(checked) => updateTract(index, 'callForPricing', !!checked)}
                            />
                            <Label htmlFor={`call-for-pricing-${index}`} className="text-gray-400 text-sm cursor-pointer">
                              Call for Pricing
                            </Label>
                          </div>

                          {!tract.callForPricing && (
                            <div className="mt-2">
                              <Label className="text-gray-400 text-xs">Price (USD)</Label>
                              <div className="relative mt-1">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                  type="number"
                                  value={tract.price}
                                  onChange={(e) => updateTract(index, 'price', e.target.value)}
                                  placeholder="18000000"
                                  className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={addTract}
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tract
                </Button>
              </div>
            )}
          </div>
        </>
      );
    }

    // RANCH-SPECIFIC FIELDS
    if (propertyType === 'ranch') {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Parcel Number (APN)</Label>
              <Input
                value={parcelNumber}
                onChange={(e) => setParcelNumber(e.target.value)}
                placeholder="98765-432-10"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Grazing Capacity (head)</Label>
              <Input
                type="number"
                placeholder="100"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Water Sources</Label>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="well" />
                <Label htmlFor="well" className="text-gray-400 text-sm cursor-pointer">Well</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pond" />
                <Label htmlFor="pond" className="text-gray-400 text-sm cursor-pointer">Pond</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="creek" />
                <Label htmlFor="creek" className="text-gray-400 text-sm cursor-pointer">Creek</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="river" />
                <Label htmlFor="river" className="text-gray-400 text-sm cursor-pointer">River</Label>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Fencing Type</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select fencing" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="pipe_and_cable">Pipe & Cable</SelectItem>
                  <SelectItem value="barbed_wire">Barbed Wire</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Fencing Condition</Label>
              <Select>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Wildlife</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline" className="border-[#2a2a2a] text-gray-400">Deer</Badge>
              <Badge variant="outline" className="border-[#2a2a2a] text-gray-400">Turkey</Badge>
              <Badge variant="outline" className="border-[#2a2a2a] text-gray-400">Quail</Badge>
              <Button variant="outline" size="sm" className="h-6 border-[#d4af37] text-[#d4af37]">
                <Plus className="w-3 h-3 mr-1" /> Add
              </Button>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-4 mt-2">
            <Label className="text-white">Structures (Optional)</Label>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-4">
                    <Label className="text-gray-400 text-sm">Main Home</Label>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">SQFT</Label>
                    <Input placeholder="3500" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">Beds</Label>
                    <Input placeholder="4" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">Baths</Label>
                    <Input placeholder="3" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#d4af37] text-[#d4af37]">
                <Plus className="w-3 h-3 mr-1" /> Add Structure (Guest House, Barn, etc.)
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="mineral-rights" />
              <Label htmlFor="mineral-rights" className="text-gray-400 text-sm cursor-pointer">Mineral Rights Included</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="surface-rights" />
              <Label htmlFor="surface-rights" className="text-gray-400 text-sm cursor-pointer">Surface Rights Included</Label>
            </div>
          </div>

          {/* Multiple Tracts Section */}
          <div className="border-t border-[#2a2a2a] pt-6 mt-4">
            <div className="flex items-center gap-3 mb-4">
              <Checkbox 
                id="multiple-tracts-ranch" 
                checked={hasMultipleTracts}
                onCheckedChange={(checked) => setHasMultipleTracts(!!checked)}
              />
              <Label htmlFor="multiple-tracts-ranch" className="text-white cursor-pointer">
                This ranch has multiple tracts/parcels
              </Label>
            </div>

            {hasMultipleTracts && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    💡 Perfect for ranches like "Bolton Ranch" with Ranch Tract (±1,369 acres @ $18M) + Commercial Tract (±391 acres - Call for Pricing)
                  </p>
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">Total Combined Acreage</Label>
                  <Input
                    value={totalCombinedAcres}
                    readOnly
                    placeholder="Auto-calculated from tracts below"
                    className="mt-2 bg-[#1a1a1a] border-[#2a2a2a] text-[#d4af37] placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-4">
                  {tracts.map((tract, index) => (
                    <div key={index} className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-white">{tract.name}</Label>
                        {tracts.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTract(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-400 text-xs">Tract Name</Label>
                          <Input
                            value={tract.name}
                            onChange={(e) => updateTract(index, 'name', e.target.value)}
                            placeholder="e.g., Ranch Tract, Commercial Tract"
                            className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-400 text-xs">Acreage *</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={tract.acres}
                            onChange={(e) => updateTract(index, 'acres', e.target.value)}
                            placeholder="1369.62"
                            className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-400 text-xs">Zoning</Label>
                          <Select value={tract.zoning} onValueChange={(val) => updateTract(index, 'zoning', val)}>
                            <SelectTrigger className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white">
                              <SelectValue placeholder="Select zoning" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="agricultural">Agricultural</SelectItem>
                              <SelectItem value="mixed">Mixed Use</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-gray-400 text-xs">Use/Purpose</Label>
                          <Input
                            value={tract.use}
                            onChange={(e) => updateTract(index, 'use', e.target.value)}
                            placeholder="e.g., Ranching, Future Development"
                            className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={`call-for-pricing-ranch-${index}`}
                              checked={tract.callForPricing}
                              onCheckedChange={(checked) => updateTract(index, 'callForPricing', !!checked)}
                            />
                            <Label htmlFor={`call-for-pricing-ranch-${index}`} className="text-gray-400 text-sm cursor-pointer">
                              Call for Pricing
                            </Label>
                          </div>

                          {!tract.callForPricing && (
                            <div className="mt-2">
                              <Label className="text-gray-400 text-xs">Price (USD)</Label>
                              <div className="relative mt-1">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <Input
                                  type="number"
                                  value={tract.price}
                                  onChange={(e) => updateTract(index, 'price', e.target.value)}
                                  placeholder="18000000"
                                  className="pl-9 bg-[#1a1a1a] border-[#2a2a2a] text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={addTract}
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tract
                </Button>
              </div>
            )}
          </div>
        </>
      );
    }

    // MULTI-FAMILY SPECIFIC FIELDS
    if (propertyType === 'multi_family') {
      return (
        <>
          <div>
            <Label className="text-gray-400 text-sm">Total Units * (minimum 2)</Label>
            <Input
              type="number"
              value={totalUnits}
              onChange={(e) => setTotalUnits(e.target.value)}
              placeholder="4"
              min="2"
              className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
            />
          </div>

          <div className="border-t border-[#2a2a2a] pt-4 mt-2">
            <Label className="text-white">Unit Breakdown</Label>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                <div className="grid md:grid-cols-5 gap-4">
                  <div>
                    <Label className="text-gray-400 text-xs">Unit</Label>
                    <Input placeholder="A" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">Beds</Label>
                    <Input placeholder="2" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">Baths</Label>
                    <Input placeholder="1" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-xs">Current Rent</Label>
                    <Input placeholder="1200" className="mt-1 bg-[#1a1a1a] border-[#2a2a2a] text-white" />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center gap-2">
                      <Checkbox id="unit-a-occupied" />
                      <Label htmlFor="unit-a-occupied" className="text-gray-400 text-xs cursor-pointer">Occupied</Label>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-[#d4af37] text-[#d4af37]">
                <Plus className="w-3 h-3 mr-1" /> Add Unit
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Gross Annual Income</Label>
              <Input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                placeholder="96000"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Annual Expenses</Label>
              <Input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="24000"
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  // Render rent-specific fields
  const renderRentFields = () => {
    if (listingType !== 'rent') return null;

    return (
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-[#d4af37]" />
            <CardTitle className="text-white">Rental Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Monthly Rent * (Required)</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2500"
                  className="pl-9 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Security Deposit</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  placeholder="2500"
                  className="pl-9 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-400 text-sm">Lease Term</Label>
              <Select value={leaseTerm} onValueChange={setLeaseTerm}>
                <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="12_months">12 Months</SelectItem>
                  <SelectItem value="24_months">24 Months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Available Date</Label>
              <Input
                type="date"
                value={availableDate}
                onChange={(e) => setAvailableDate(e.target.value)}
                className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-400 text-sm">Pet Policy</Label>
            <Select value={petPolicy} onValueChange={setPetPolicy}>
              <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Select policy" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectItem value="allowed">Allowed (with fee)</SelectItem>
                <SelectItem value="not_allowed">Not Allowed</SelectItem>
                <SelectItem value="negotiable">Negotiable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(propertyType === 'house' || propertyType === 'apartment') && (
            <>
              <div>
                <Label className="text-gray-400 text-sm">Utilities Included</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="util-water" />
                    <Label htmlFor="util-water" className="text-gray-400 text-sm cursor-pointer">Water</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="util-trash" />
                    <Label htmlFor="util-trash" className="text-gray-400 text-sm cursor-pointer">Trash</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="util-electric" />
                    <Label htmlFor="util-electric" className="text-gray-400 text-sm cursor-pointer">Electric</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="util-gas" />
                    <Label htmlFor="util-gas" className="text-gray-400 text-sm cursor-pointer">Gas</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-400 text-sm">Appliances Included</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="app-washer" />
                    <Label htmlFor="app-washer" className="text-gray-400 text-sm cursor-pointer">Washer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="app-dryer" />
                    <Label htmlFor="app-dryer" className="text-gray-400 text-sm cursor-pointer">Dryer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="app-fridge" />
                    <Label htmlFor="app-fridge" className="text-gray-400 text-sm cursor-pointer">Refrigerator</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="app-dishwasher" />
                    <Label htmlFor="app-dishwasher" className="text-gray-400 text-sm cursor-pointer">Dishwasher</Label>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      userRole="broker" 
      userName="Michael Rivers"
      onLogout={onLogout}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-white mb-2">Create Listing</h1>
          <p className="text-gray-400">Add a single property or upload multiple listings in bulk</p>
        </div>

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-[#1a1a1a] border border-[#2a2a2a]">
            <TabsTrigger value="single" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
              Single Listing
            </TabsTrigger>
            <TabsTrigger value="bulk" className="data-[state=active]:bg-[#d4af37] data-[state=active]:text-black">
              Bulk Upload
            </TabsTrigger>
          </TabsList>

          {/* ========================================== */}
          {/* TAB 1: SINGLE LISTING */}
          {/* ========================================== */}
          <TabsContent value="single" className="mt-6 space-y-8">
            {/* Property Type & Listing Type Selection */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Step 1: Property Type & Listing Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-400 text-sm">Property Type *</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                      {propertyTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">Listing Type *</Label>
                  <RadioGroup value={listingType} onValueChange={(val) => setListingType(val as 'sale' | 'rent')} className="flex gap-4 mt-2">
                    <div className="flex items-center gap-2 p-3 border border-[#2a2a2a] rounded-lg flex-1 cursor-pointer hover:border-[#d4af37]/50 transition-colors">
                      <RadioGroupItem value="sale" id="sale" />
                      <Label htmlFor="sale" className="text-white cursor-pointer flex-1">For Sale</Label>
                    </div>
                    <div className="flex items-center gap-2 p-3 border border-[#2a2a2a] rounded-lg flex-1 cursor-pointer hover:border-[#d4af37]/50 transition-colors">
                      <RadioGroupItem value="rent" id="rent" />
                      <Label htmlFor="rent" className="text-white cursor-pointer flex-1">For Rent</Label>
                    </div>
                  </RadioGroup>
                </div>

                {propertyType && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-blue-300 mb-1">
                          {propertyType === 'house' && 'Houses require beds, baths, and SQFT. Acreage shown as lot size.'}
                          {propertyType === 'condo' && 'Condos require unit number and HOA fees.'}
                          {propertyType === 'land' && 'Land requires acreage and coordinates for map display.'}
                          {propertyType === 'ranch' && 'Ranches require acreage, water sources, and structures.'}
                          {propertyType === 'multi_family' && 'Multi-family requires at least 2 units with unit breakdown.'}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {listingType === 'sale' ? 'Sale price is required' : 'Monthly rent is required'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Basic Information */}
            {propertyType && (
              <>
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Tag className="w-6 h-6 text-[#d4af37]" />
                      <CardTitle className="text-white">Basic Information</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="title" className="text-gray-400 text-sm">Property Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={
                          propertyType === 'house' ? 'e.g., Luxury Estate with Pool' :
                          propertyType === 'condo' ? 'e.g., Downtown Tower Unit 302' :
                          propertyType === 'land' ? 'e.g., Hill Country Lot 15' :
                          propertyType === 'ranch' ? 'e.g., Hill Country Ranch Estate' :
                          'e.g., Property Title'
                        }
                        className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-gray-400 text-sm">Description *</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a detailed description of the property..."
                        className="mt-2 min-h-[150px] bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="price" className="text-gray-400 text-sm">
                          {listingType === 'sale' ? 'Sale Price (USD) *' : 'Listed under Rental Details'}
                        </Label>
                        {listingType === 'sale' && (
                          <div className="relative mt-2">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input
                              id="price"
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              placeholder="2500000"
                              className="pl-9 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Client Consent-to-List */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-6 h-6 text-[#d4af37]" />
                      <CardTitle className="text-white">Client Consent-to-List Agreement</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                      <AlertDescription>
                        Select an approved client or upload a new consent agreement. Consents are valid for 12 months.
                      </AlertDescription>
                    </Alert>

                    {!addingNewClient ? (
                      <>
                        <div>
                          <Label className="text-gray-400 text-sm">Select Approved Client *</Label>
                          <Select value={selectedClient} onValueChange={setSelectedClient}>
                            <SelectTrigger className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                              <SelectValue placeholder={loadingClients ? "Loading clients..." : "Choose a client"} />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                              {approvedClients.filter(c => !c.is_expired).map((client) => (
                                <SelectItem key={client.consent_id} value={client.consent_id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{client.client_name}</span>
                                    {client.days_until_expiration <= 30 && (
                                      <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                        Expires in {client.days_until_expiration} days
                                      </Badge>
                                    )}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {approvedClients.length === 0 && !loadingClients && (
                            <p className="text-sm text-gray-500 mt-2">No approved clients yet. Add a new client below.</p>
                          )}
                        </div>

                        {selectedClient && (
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                              <div>
                                <p className="text-green-400 mb-1">Consent Auto-Verified</p>
                                <p className="text-sm text-gray-400">
                                  This listing will be auto-verified because the client has an active consent-to-list agreement.
                                </p>
                                {approvedClients.find(c => c.consent_id === selectedClient)?.days_until_expiration <= 30 && (
                                  <Alert className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400 mt-3">
                                    <AlertTriangle className="w-4 h-4" />
                                    <AlertDescription>
                                      This consent expires in {approvedClients.find(c => c.consent_id === selectedClient)?.days_until_expiration} days. Consider renewing soon.
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-[#2a2a2a]">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setAddingNewClient(true)}
                            className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Or Add New Client with Consent
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Upload className="w-5 h-5 text-[#d4af37] mt-0.5" />
                            <div>
                              <p className="text-[#d4af37] mb-1">Adding New Client</p>
                              <p className="text-sm text-gray-400">
                                Upload a signed consent-to-list agreement. This will be submitted with your listing for admin approval.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-gray-400 text-sm">Client Full Name *</Label>
                            <Input
                              value={newClientName}
                              onChange={(e) => setNewClientName(e.target.value)}
                              placeholder="John Smith"
                              className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                            />
                          </div>

                          <div>
                            <Label className="text-gray-400 text-sm">Client Email (Optional)</Label>
                            <div className="relative mt-2">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                              <Input
                                type="email"
                                value={newClientEmail}
                                onChange={(e) => setNewClientEmail(e.target.value)}
                                placeholder="john.smith@example.com"
                                className="pl-9 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label className="text-gray-400 text-sm">Client Phone (Optional)</Label>
                          <div className="relative mt-2">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input
                              value={newClientPhone}
                              onChange={(e) => setNewClientPhone(e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              className="pl-9 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-gray-400 text-sm">Consent Document *</Label>
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setConsentFile(e.target.files?.[0] || null)}
                            className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white"
                          />
                          {consentFile && (
                            <p className="text-sm text-gray-400 mt-2">Selected: {consentFile.name}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (max 10MB)</p>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setAddingNewClient(false);
                              setNewClientName('');
                              setNewClientEmail('');
                              setNewClientPhone('');
                              setConsentFile(null);
                            }}
                            className="border-[#2a2a2a] text-gray-300 hover:bg-[#2a2a2a]"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              if (!newClientName.trim() || !consentFile) {
                                toast.error('Please provide client name and consent document');
                                return;
                              }
                              toast.success('New client added. Complete the listing to submit for review.');
                            }}
                            className="bg-[#d4af37] hover:bg-[#c49d2f] text-black"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Confirm New Client
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Location Details */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-[#d4af37]" />
                      <CardTitle className="text-white">Location Details</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="address" className="text-gray-400 text-sm">Full Address *</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main Street"
                        className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label htmlFor="city" className="text-gray-400 text-sm">City *</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Austin"
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state" className="text-gray-400 text-sm">State *</Label>
                        <Input
                          id="state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="TX"
                          maxLength={2}
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="zip" className="text-gray-400 text-sm">ZIP Code *</Label>
                        <Input
                          id="zip"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="78701"
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="county" className="text-gray-400 text-sm">County *</Label>
                      <Input
                        id="county"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        placeholder="Travis"
                        className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="text-amber-300 mb-1">Coordinates Required</p>
                          <p className="text-gray-400 text-xs">Latitude and longitude are mandatory for map display and spatial queries.</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="latitude" className="text-gray-400 text-sm">Latitude *</Label>
                        <Input
                          id="latitude"
                          type="number"
                          step="any"
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                          placeholder="30.2672"
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="longitude" className="text-gray-400 text-sm">Longitude *</Label>
                        <Input
                          id="longitude"
                          type="number"
                          step="any"
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                          placeholder="-97.7431"
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="border-[#d4af37] text-[#d4af37]">
                        <MapPin className="w-4 h-4 mr-2" />
                        Pick on Map
                      </Button>
                      <Button variant="outline" className="border-[#2a2a2a] text-gray-400">
                        Auto-Geocode from Address
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Universal Property Details */}
                {(propertyType !== 'land' && propertyType !== 'ranch') && (
                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Maximize className="w-6 h-6 text-[#d4af37]" />
                        <CardTitle className="text-white">Property Details</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label className="text-gray-400 text-sm">Beds {propertyType === 'house' && '*'}</Label>
                          <Input
                            type="number"
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            placeholder="3"
                            className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-400 text-sm">Baths {propertyType === 'house' && '*'}</Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                            placeholder="2.5"
                            className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-400 text-sm">SQFT {propertyType === 'house' && '*'}</Label>
                          <Input
                            type="number"
                            value={sqft}
                            onChange={(e) => setSqft(e.target.value)}
                            placeholder="2400"
                            className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                          />
                        </div>
                      </div>

                      {propertyType === 'house' && (
                        <div>
                          <Label className="text-gray-400 text-sm">Lot Size (sq ft) - Acreage calculated automatically</Label>
                          <Input
                            type="number"
                            placeholder="21780"
                            className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                          />
                          <p className="text-gray-500 text-xs mt-1">21,780 sq ft = 0.5 acres</p>
                        </div>
                      )}

                      <div>
                        <Label className="text-gray-400 text-sm">Year Built</Label>
                        <Input
                          type="number"
                          value={yearBuilt}
                          onChange={(e) => setYearBuilt(e.target.value)}
                          placeholder="2020"
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Acreage for Land/Ranch */}
                {(propertyType === 'land' || propertyType === 'ranch') && (
                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Maximize className="w-6 h-6 text-[#d4af37]" />
                        <CardTitle className="text-white">Property Details</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="text-gray-400 text-sm">Acreage * (Required)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={acreage}
                          onChange={(e) => setAcreage(e.target.value)}
                          placeholder="250"
                          className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Property Type-Specific Fields */}
                {propertyType && (
                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                    <CardHeader>
                      <CardTitle className="text-white">
                        {propertyType === 'house' && 'House-Specific Details'}
                        {propertyType === 'condo' && 'Condo-Specific Details'}
                        {propertyType === 'land' && 'Land-Specific Details'}
                        {propertyType === 'ranch' && 'Ranch-Specific Details'}
                        {propertyType === 'multi_family' && 'Multi-Family Details'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {renderPropertyTypeFields()}
                    </CardContent>
                  </Card>
                )}

                {/* Rental Details (if rent) */}
                {renderRentFields()}

                {/* Features & Amenities */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <CardTitle className="text-white">Features & Amenities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-400 text-sm">Features</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          placeholder="e.g., Hardwood Floors"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                          className="bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                        <Button onClick={addFeature} className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {features.map(feature => (
                          <Badge key={feature} variant="outline" className="border-[#d4af37] text-[#d4af37] pl-3 pr-1 py-1">
                            {feature}
                            <button onClick={() => removeFeature(feature)} className="ml-2 hover:text-white">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400 text-sm">Amenities</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          placeholder="e.g., Pool"
                          value={newAmenity}
                          onChange={(e) => setNewAmenity(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                          className="bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                        />
                        <Button onClick={addAmenity} className="bg-[#d4af37] hover:bg-[#c19b2b] text-black">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {amenities.map(amenity => (
                          <Badge key={amenity} variant="outline" className="border-[#d4af37] text-[#d4af37] pl-3 pr-1 py-1">
                            {amenity}
                            <button onClick={() => removeAmenity(amenity)} className="ml-2 hover:text-white">
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Media Upload */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Image className="w-6 h-6 text-[#d4af37]" />
                      <CardTitle className="text-white">Photos & Media</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-400 text-sm">Property Photos</Label>
                      <div className="mt-2 border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-white mb-2">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-sm">PNG, JPG, WebP up to 10MB (Unlimited)</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400 text-sm">Videos</Label>
                      <div className="mt-2 border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-white mb-2">Upload property videos</p>
                        <p className="text-gray-500 text-sm">MP4, MOV up to 2GB</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400 text-sm">360° Virtual Tour</Label>
                      <div className="mt-2 border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-white mb-2">Upload 360° photos or videos</p>
                        <p className="text-gray-500 text-sm">Equirectangular format</p>
                      </div>
                    </div>

                    {(propertyType === 'land' || propertyType === 'ranch') && (
                      <div>
                        <Label className="text-gray-400 text-sm">Site Plan / Survey Map</Label>
                        <div className="mt-2 border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <p className="text-white mb-2">Upload site plan</p>
                          <p className="text-gray-500 text-sm">PDF, JPG recommended</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-end pb-8">
                  <Button
                    variant="outline"
                    className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
                    onClick={() => navigate('/broker/listings')}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                    onClick={handleSaveDraft}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button
                    className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                    onClick={handleSubmitForReview}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Review
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* ========================================== */}
          {/* TAB 2: BULK UPLOAD */}
          {/* ========================================== */}
          <TabsContent value="bulk" className="mt-6 space-y-8">
            {/* Batch Information */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Step 1: Batch Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-400 text-sm">Batch Name *</Label>
                  <Input
                    placeholder='e.g., "Downtown Tower Units 101-150"'
                    value={batchName}
                    onChange={(e) => setBatchName(e.target.value)}
                    className="mt-2 bg-[#0f0f0f] border-[#2a2a2a] text-white placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label className="text-gray-400 text-sm">Property Type(s) *</Label>
                  <RadioGroup value={batchPropertyType} onValueChange={setBatchPropertyType} className="mt-2 space-y-3">
                    <div className="flex items-start gap-3 p-4 border border-[#2a2a2a] rounded-lg hover:border-[#d4af37]/50 transition-colors">
                      <RadioGroupItem value="single" id="single-type" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="single-type" className="text-white cursor-pointer">Single Type</Label>
                        <p className="text-gray-400 text-sm mt-1">All listings in CSV are the same property type</p>
                        {batchPropertyType === 'single' && (
                          <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                            <SelectTrigger className="mt-3 bg-[#0f0f0f] border-[#2a2a2a] text-white">
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                              {propertyTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border border-[#2a2a2a] rounded-lg hover:border-[#d4af37]/50 transition-colors">
                      <RadioGroupItem value="mixed" id="mixed-type" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="mixed-type" className="text-white cursor-pointer">Mixed Batch</Label>
                        <p className="text-gray-400 text-sm mt-1">CSV contains multiple property types (requires property_type column)</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* CSV Upload */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
              <CardHeader>
                <CardTitle className="text-white">Step 2: Upload CSV File</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCsvUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="block border-2 border-dashed border-[#2a2a2a] rounded-lg p-12 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer"
                  >
                    <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-white text-lg mb-2">Click to upload or drag & drop CSV</p>
                    <p className="text-gray-500 text-sm">Supports up to 500 listings per batch</p>
                    {csvFile && (
                      <p className="text-[#d4af37] mt-3">Uploaded: {csvFile.name}</p>
                    )}
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400" onClick={() => downloadTemplate('condo')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Condo CSV
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400" onClick={() => downloadTemplate('house')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download House CSV
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400" onClick={() => downloadTemplate('land')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Land CSV
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400" onClick={() => downloadTemplate('ranch')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Ranch CSV
                  </Button>
                  <Button variant="outline" size="sm" className="border-[#2a2a2a] text-gray-400" onClick={() => downloadTemplate('mixed')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Mixed Batch CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview & Validate */}
            {csvPreview.length > 0 && (
              <>
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <CardTitle className="text-white">Step 3: Preview & Validate</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-white">50 listings parsed successfully</span>
                        </div>
                      </div>

                      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-amber-400" />
                          <span className="text-white">3 warnings</span>
                        </div>
                      </div>

                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <X className="w-5 h-5 text-red-400" />
                          <span className="text-white">2 errors</span>
                        </div>
                      </div>
                    </div>

                    {uploadErrors.length > 0 && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-300 mb-2">Errors detected:</p>
                        <ul className="text-sm text-gray-400 space-y-1">
                          {uploadErrors.map((err, idx) => (
                            <li key={idx}>Row {err.row}: {err.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border border-[#2a2a2a] rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                            <TableHead className="text-gray-400">Order</TableHead>
                            <TableHead className="text-gray-400">Title</TableHead>
                            <TableHead className="text-gray-400">Type</TableHead>
                            <TableHead className="text-gray-400">Price</TableHead>
                            <TableHead className="text-gray-400">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {csvPreview.map((row) => (
                            <TableRow key={row.order} className="border-[#2a2a2a] hover:bg-[#1a1a1a]">
                              <TableCell className="text-white">{row.order}</TableCell>
                              <TableCell className="text-white">{row.title}</TableCell>
                              <TableCell className="text-gray-400">{row.type}</TableCell>
                              <TableCell className="text-[#d4af37]">{row.price}</TableCell>
                              <TableCell>
                                {row.status === 'valid' && <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✅ Valid</Badge>}
                                {row.status === 'warning' && <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">⚠️ Warning</Badge>}
                                {row.status === 'error' && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">❌ Error</Badge>}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Bulk Media Upload */}
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]">
                  <CardHeader>
                    <CardTitle className="text-white">Step 4: Bulk Media Upload (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 text-sm mb-2">Naming Convention:</p>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Unit101_photo1.jpg</li>
                        <li>• Unit101_photo2.jpg</li>
                        <li>• Unit102_photo1.jpg</li>
                      </ul>
                      <p className="text-gray-400 text-xs mt-2">Photos will be auto-matched to listings by filename → Unit Number</p>
                    </div>

                    <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#d4af37]/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-white mb-2">Upload bulk photos (0 files)</p>
                      <p className="text-gray-500 text-sm">Drag & drop multiple files</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-end pb-8">
                  <Button
                    variant="outline"
                    className="border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white"
                    onClick={() => navigate('/broker/listings')}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                    onClick={() => alert('Batch saved as draft')}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button
                    className="bg-[#d4af37] hover:bg-[#c19b2b] text-black"
                    onClick={() => alert('Batch submitted for review')}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Batch for Review
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
