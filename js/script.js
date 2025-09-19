// KrishiSense - JavaScript Functionality

// Global variables
let currentUser = null;
let currentSection = 'home';
let userEmail = null;
let selectedCrop = null; // Store the selected crop for weather intelligence and yield optimization

// Comprehensive District data for all states (50%+ coverage)
const districtData = {
    'andhra_pradesh': [
        'Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna',
        'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam',
        'Vizianagaram', 'West Godavari', 'YSR Kadapa', 'NTR', 'Palnadu',
        'Bapatla', 'Eluru', 'Kakinada', 'Konaseema', 'Nandyal', 'Sri Sathya Sai',
        'Tirupati', 'Annamayya', 'Alluri Sitharama Raju', 'Parvathipuram Manyam'
    ],
    'arunachal_pradesh': [
        'Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang',
        'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit',
        'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri',
        'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang',
        'Tawang', 'Tirap', 'Upper Siang', 'Upper Subansiri', 'West Kameng',
        'West Siang', 'Itanagar'
    ],
    'assam': [
        'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo',
        'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao',
        'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup',
        'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar',
        'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar',
        'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
    ],
    'bihar': [
        'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur',
        'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj',
        'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj',
        'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur',
        'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa',
        'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi',
        'Siwan', 'Supaul', 'Vaishali', 'West Champaran'
    ],
    'chhattisgarh': [
        'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur',
        'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Janjgir-Champa',
        'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya',
        'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon',
        'Sukma', 'Surajpur', 'Surguja'
    ],
    'goa': [
        'North Goa', 'South Goa'
    ],
    'gujarat': [
        'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
        'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod',
        'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath',
        'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar',
        'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal',
        'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat',
        'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'
    ],
    'haryana': [
        'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad',
        'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal',
        'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal', 'Panchkula',
        'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'
    ],
    'himachal_pradesh': [
        'Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu',
        'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'
    ],
    'jharkhand': [
        'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum',
        'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara',
        'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu',
        'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega',
        'West Singhbhum'
    ],
    'karnataka': [
        'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
        'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga',
        'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan',
        'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya',
        'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru',
        'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'
    ],
    'kerala': [
        'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam',
        'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta',
        'Thiruvananthapuram', 'Thrissur', 'Wayanad'
    ],
    'madhya_pradesh': [
        'Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat',
        'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur',
        'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori',
        'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur',
        'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur',
        'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh',
        'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol',
        'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh',
        'Ujjain', 'Umaria', 'Vidisha'
    ],
    'maharashtra': [
        'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed',
        'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli',
        'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur',
        'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar',
        'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad',
        'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur',
        'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ],
    'manipur': [
        'Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West',
        'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl',
        'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'
    ],
    'meghalaya': [
        'East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills',
        'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills',
        'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'
    ],
    'mizoram': [
        'Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai',
        'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'
    ],
    'nagaland': [
        'Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon',
        'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'
    ],
    'odisha': [
        'Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh',
        'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur',
        'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara',
        'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj',
        'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur',
        'Subarnapur', 'Sundargarh'
    ],
    'punjab': [
        'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 
        'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala',
        'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Patiala', 'Rupnagar',
        'Sangrur', 'Tarn Taran', 'Fazilka', 'Malerkotla', 'Pathankot', 'SAS Nagar'
    ],
    'rajasthan': [
        'Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur',
        'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa',
        'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer',
        'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota',
        'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur',
        'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'
    ],
    'sikkim': [
        'East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'
    ],
    'tamil_nadu': [
        'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
        'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
        'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
        'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram',
        'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
        'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
        'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
        'Viluppuram', 'Virudhunagar'
    ],
    'telangana': [
        'Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon',
        'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar',
        'Khammam', 'Komaram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar',
        'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool',
        'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli',
        'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet',
        'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'
    ],
    'tripura': [
        'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala',
        'South Tripura', 'Unakoti', 'West Tripura'
    ],
    'uttar_pradesh': [
        'Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha',
        'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur',
        'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor',
        'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria',
        'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad',
        'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur',
        'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur',
        'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj',
        'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow',
        'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut',
        'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh',
        'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar',
        'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur',
        'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'
    ],
    'uttarakhand': [
        'Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar',
        'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal',
        'Udham Singh Nagar', 'Uttarkashi'
    ],
    'west_bengal': [
        'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
        'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram',
        'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia',
        'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
        'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas',
        'Uttar Dinajpur'
    ],
    'andaman_nicobar': [
        'Nicobar', 'North and Middle Andaman', 'South Andaman'
    ],
    'chandigarh': [
        'Chandigarh'
    ],
    'dadra_nagar_haveli': [
        'Dadra and Nagar Haveli'
    ],
    'daman_diu': [
        'Daman', 'Diu'
    ],
    'delhi': [
        'Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi',
        'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi',
        'West Delhi'
    ],
    'jammu_kashmir': [
        'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal',
        'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch',
        'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian',
        'Srinagar', 'Udhampur'
    ],
    'ladakh': [
        'Kargil', 'Leh'
    ],
    'lakshadweep': [
        'Lakshadweep'
    ],
    'puducherry': [
        'Karaikal', 'Mahe', 'Puducherry', 'Yanam'
    ]
};

// District update function
function updateDistricts() {
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    
    // Clear existing options
    districtSelect.innerHTML = '<option value="">Select District</option>';
    
    if (stateSelect.value && districtData[stateSelect.value]) {
        const districts = districtData[stateSelect.value];
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(/\s+/g, '_');
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

// Region-specific optimal crops database
const regionOptimalCrops = {
    'bihar': {
        'madhubani': {
            optimalCrops: ['makhana', 'rice', 'wheat', 'maize'],
            speciality: 'Makhana (Fox Nut) - Premium crop for this region',
            soilType: 'alluvial',
            rainfall: 1200
        },
        'darbhanga': {
            optimalCrops: ['rice', 'wheat', 'maize', 'sugarcane'],
            speciality: 'Rice cultivation - High yield potential',
            soilType: 'alluvial',
            rainfall: 1100
        },
        'muzaffarpur': {
            optimalCrops: ['litchi', 'maize', 'wheat', 'rice'],
            speciality: 'Litchi - Famous for Shahi Litchi variety',
            soilType: 'alluvial',
            rainfall: 1150
        },
        'patna': {
            optimalCrops: ['wheat', 'rice', 'maize', 'mustard'],
            speciality: 'Wheat - High productivity zone',
            soilType: 'alluvial',
            rainfall: 1000
        }
    },
    'punjab': {
        'ludhiana': {
            optimalCrops: ['wheat', 'rice', 'maize', 'cotton'],
            speciality: 'Wheat - Highest productivity in India',
            soilType: 'alluvial',
            rainfall: 650
        },
        'amritsar': {
            optimalCrops: ['wheat', 'rice', 'maize'],
            speciality: 'Wheat - Premium quality grain',
            soilType: 'alluvial',
            rainfall: 600
        },
        'jalandhar': {
            optimalCrops: ['wheat', 'rice', 'sugarcane'],
            speciality: 'Rice - Basmati variety',
            soilType: 'alluvial',
            rainfall: 700
        }
    },
    'haryana': {
        'karnal': {
            optimalCrops: ['wheat', 'rice', 'maize', 'mustard'],
            speciality: 'Wheat - High yield variety',
            soilType: 'alluvial',
            rainfall: 550
        },
        'hisar': {
            optimalCrops: ['wheat', 'cotton', 'mustard', 'guar'],
            speciality: 'Cotton - High quality fiber',
            soilType: 'sandy',
            rainfall: 400
        }
    },
    'uttar_pradesh': {
        'lucknow': {
            optimalCrops: ['wheat', 'rice', 'sugarcane', 'potato'],
            speciality: 'Sugarcane - High sugar content',
            soilType: 'alluvial',
            rainfall: 900
        },
        'kanpur': {
            optimalCrops: ['wheat', 'rice', 'sugarcane'],
            speciality: 'Wheat - Industrial quality',
            soilType: 'alluvial',
            rainfall: 850
        }
    },
    'madhya_pradesh': {
        'indore': {
            optimalCrops: ['wheat', 'soybean', 'maize', 'cotton'],
            speciality: 'Soybean - Oilseed production',
            soilType: 'black',
            rainfall: 800
        },
        'bhopal': {
            optimalCrops: ['wheat', 'rice', 'maize', 'chickpea'],
            speciality: 'Wheat - High protein content',
            soilType: 'black',
            rainfall: 900
        }
    },
    'gujarat': {
        'anand': {
            optimalCrops: ['groundnut', 'cotton', 'wheat', 'maize'],
            speciality: 'Groundnut - Oilseed capital',
            soilType: 'sandy',
            rainfall: 600
        },
        'surat': {
            optimalCrops: ['cotton', 'sugarcane', 'rice'],
            speciality: 'Cotton - Premium quality',
            soilType: 'alluvial',
            rainfall: 1000
        }
    },
    'maharashtra': {
        'nashik': {
            optimalCrops: ['grapes', 'onion', 'tomato', 'sugarcane'],
            speciality: 'Grapes - Wine quality',
            soilType: 'black',
            rainfall: 700
        },
        'pune': {
            optimalCrops: ['sugarcane', 'wheat', 'rice', 'onion'],
            speciality: 'Sugarcane - High yield',
            soilType: 'black',
            rainfall: 800
        }
    },
    'karnataka': {
        'mysuru': {
            optimalCrops: ['sugarcane', 'rice', 'maize', 'ragi'],
            speciality: 'Sugarcane - Premium quality',
            soilType: 'red',
            rainfall: 750
        },
        'belagavi': {
            optimalCrops: ['sugarcane', 'maize', 'wheat', 'chickpea'],
            speciality: 'Sugarcane - High sugar recovery',
            soilType: 'black',
            rainfall: 650
        }
    },
    'tamil_nadu': {
        'coimbatore': {
            optimalCrops: ['cotton', 'sugarcane', 'rice', 'maize'],
            speciality: 'Cotton - Long staple variety',
            soilType: 'red',
            rainfall: 600
        },
        'salem': {
            optimalCrops: ['sugarcane', 'rice', 'maize', 'groundnut'],
            speciality: 'Sugarcane - High productivity',
            soilType: 'red',
            rainfall: 700
        }
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize landing page
    initializeLandingPage();
    
    // Initialize dashboard (hidden initially)
    initializeDashboard();
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Initialize form handlers
    initializeFormHandlers();
    
    // Add loading animations
    addLoadingAnimations();
    
    // Initialize modal reset
    initializeModalReset();
}

function initializeModalReset() {
    // Reset modal when closed
    const loginModal = document.getElementById('loginModal');
    loginModal.addEventListener('hidden.bs.modal', function() {
        // Reset all forms to initial state
        document.getElementById('login-options').style.display = 'block';
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('otp-form').style.display = 'none';
        document.getElementById('profile-form').style.display = 'none';
        
        // Clear form inputs
        document.getElementById('gmail-input').value = '';
        document.getElementById('otp-input').value = '';
        document.getElementById('profile-name').value = '';
        
        // Reset user email
        userEmail = null;
    });
}

// Landing Page Functions
function initializeLandingPage() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(163, 228, 183, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--primary-green), var(--secondary-green))';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Add animation to feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}

// Modal Functions
function loginAsGuest() {
    currentUser = {
        name: 'Guest User',
        type: 'guest',
        email: 'guest@krishisense.com'
    };
    
    // Close modal and show dashboard
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    
    showDashboard();
    showNotification('Welcome, Guest User! Explore our AI crop suggestions!', 'success');
    
    // Show crop suggestions section first for guest users
    setTimeout(() => {
        showSection('crop-prediction');
        updateActiveNavLink(document.querySelector('[data-section="crop-prediction"]'));
    }, 500);
}

function showLoginForm() {
    // Hide login options and show Gmail login form
    document.getElementById('login-options').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    
    // Initialize Gmail login form
    const gmailForm = document.getElementById('gmail-login-form');
    gmailForm.addEventListener('submit', handleGmailLogin);
}

function handleGmailLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('gmail-input').value.trim();
    
    // Validate Gmail address
    if (!email.endsWith('@gmail.com')) {
        showNotification('Please enter a valid Gmail address ending with @gmail.com', 'error');
        return;
    }
    
    // Store email for later use
    userEmail = email;
    
    // Show OTP form
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('otp-form').style.display = 'block';
    
    // Initialize OTP form
    const otpForm = document.getElementById('otp-verification-form');
    otpForm.addEventListener('submit', handleOTPVerification);
    
    showNotification('OTP sent to your Gmail address! Use 1234 as the OTP.', 'success');
}

function handleOTPVerification(e) {
    e.preventDefault();
    
    const otp = document.getElementById('otp-input').value.trim();
    
    // Check if OTP is correct (dummy OTP is 1234)
    if (otp === '1234') {
        // Show profile setup form
        document.getElementById('otp-form').style.display = 'none';
        document.getElementById('profile-form').style.display = 'block';
        
        // Initialize profile form
        const profileForm = document.getElementById('profile-setup-form');
        profileForm.addEventListener('submit', handleProfileSetup);
        
        showNotification('OTP verified successfully!', 'success');
    } else {
        showNotification('Invalid OTP. Please enter 1234 as the OTP.', 'error');
    }
}

function handleProfileSetup(e) {
    e.preventDefault();
    
    const profileName = document.getElementById('profile-name').value.trim();
    
    if (!profileName) {
        showNotification('Please enter your name', 'error');
        return;
    }
    
    // Set up user data
    currentUser = {
        name: profileName,
        type: 'user',
        email: userEmail
    };
    
    // Close modal and show dashboard
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();
    
    showDashboard();
    showNotification(`Welcome, ${profileName}! Your dashboard is ready.`, 'success');
    
    // Show home section first for regular users
    setTimeout(() => {
        showSection('home');
        updateActiveNavLink(document.querySelector('[data-section="home"]'));
    }, 500);
}

function goBackToOptions() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-options').style.display = 'block';
}

function goBackToLogin() {
    document.getElementById('otp-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showDashboard() {
    // Hide landing page
    document.getElementById('landing-page').classList.add('d-none');
    
    // Show dashboard
    document.getElementById('dashboard-page').classList.remove('d-none');
    
    // Update welcome message
    updateWelcomeMessage();
    
    // Initialize dashboard sections
    initializeDashboardSections();
}

function updateWelcomeMessage() {
    const welcomeTitle = document.querySelector('.welcome-title');
    if (currentUser) {
        welcomeTitle.textContent = `Welcome back, ${currentUser.name}!`;
    }
}

// Dashboard Functions
function initializeDashboard() {
    // Initialize sidebar navigation
    initializeSidebarNavigation();
    
    // Initialize weather data
    initializeWeatherData();
    
    // Initialize crop prediction
    initializeCropPrediction();
    
    // Initialize recommendations
    initializeRecommendations();
    
    // Initialize contact form
    initializeContactForm();
}

function initializeSidebarNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
                updateActiveNavLink(this);
            }
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('d-none');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.remove('d-none');
        currentSection = sectionName;
        
        // Add fade-in animation
        targetSection.style.animation = 'fadeInUp 0.5s ease-out';
        
        // Load section-specific data
        loadSectionData(sectionName);
    }
}

function updateActiveNavLink(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

function loadSectionData(sectionName) {
    switch(sectionName) {
        case 'weather':
            updateWeatherData();
            break;
        case 'weather-intelligence':
            // Check if crop is selected and show appropriate content
            if (selectedCrop) {
                showWeatherIntelligenceContent();
            }
            break;
        case 'crop-prediction':
            // Already initialized
            break;
        case 'yield-optimization':
            // Check if crop is selected and show appropriate content
            if (selectedCrop) {
                showYieldOptimizationContent();
            }
            break;
        case 'recommendations':
            updateRecommendations();
            break;
        case 'contact':
            // Already initialized
            break;
    }
}

// Weather Functions
function initializeWeatherData() {
    // Weather data will be updated when section is loaded
}

function updateWeatherData() {
    // Simulate realistic weather data for agricultural regions
    const temperature = document.querySelector('.temp-value');
    const rainProbability = document.querySelector('.probability-value');
    
    if (temperature && rainProbability) {
        // Realistic temperature range for agricultural areas (20-35°C)
        const baseTemp = 26;
        const variation = Math.random() * 6 - 3; // -3 to +3
        const currentTemp = Math.round(baseTemp + variation);
        
        // Realistic rain probability based on season
        const currentMonth = new Date().getMonth();
        let baseRain = 30; // Base rain probability
        
        // Adjust based on Indian monsoon seasons
        if (currentMonth >= 5 && currentMonth <= 9) { // Monsoon season
            baseRain = 65;
        } else if (currentMonth >= 10 && currentMonth <= 12) { // Post-monsoon
            baseRain = 25;
        } else if (currentMonth >= 1 && currentMonth <= 4) { // Pre-monsoon
            baseRain = 15;
        }
        
        const rainVariation = Math.random() * 10 - 5; // -5 to +5
        const currentRain = Math.max(0, Math.min(100, Math.round(baseRain + rainVariation)));
        
        temperature.textContent = currentTemp;
        rainProbability.textContent = currentRain + '%';
        
        // Update weather icon based on rain probability
        updateWeatherIcon(currentRain);
    }
}

function updateWeatherIcon(rainProbability) {
    const weatherIcon = document.querySelector('.weather-icon i');
    if (weatherIcon) {
        if (rainProbability > 60) {
            weatherIcon.className = 'fas fa-cloud-rain';
        } else if (rainProbability > 30) {
            weatherIcon.className = 'fas fa-cloud';
        } else {
            weatherIcon.className = 'fas fa-sun';
        }
    }
}

// Crop Suggestion Functions
function initializeCropPrediction() {
    const form = document.getElementById('crop-suggestion-form');
    if (form) {
        form.addEventListener('submit', handleCropSuggestion);
    }
}

function handleCropSuggestion(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        state: document.getElementById('state').value,
        district: document.getElementById('district').value,
        plantingDate: document.getElementById('planting-date').value,
        cropName: document.getElementById('crop-name').value,
        soilType: document.getElementById('soil-type').value,
        rainfall: parseFloat(document.getElementById('rainfall').value),
        temperature: parseFloat(document.getElementById('temperature').value),
        area: parseFloat(document.getElementById('area').value)
    };
    
    // Validate form
    if (!validateSuggestionForm(formData)) {
        return;
    }
    
    // Show loading
    showSuggestionLoading();
    
    // Simulate API call
    setTimeout(() => {
        const suggestions = generateCropSuggestions(formData);
        displaySuggestionResult(suggestions);
    }, 2000);
}

function validateSuggestionForm(data) {
    if (!data.state || !data.district || !data.plantingDate || !data.soilType || !data.rainfall || !data.temperature || !data.area) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }
    
    if (data.rainfall < 0 || data.rainfall > 3000) {
        showNotification('Rainfall should be between 0 and 3000 mm', 'error');
        return false;
    }
    
    if (data.temperature < -10 || data.temperature > 50) {
        showNotification('Temperature should be between -10°C and 50°C', 'error');
        return false;
    }
    
    if (data.area <= 0 || data.area > 1000) {
        showNotification('Area should be between 0 and 1000 hectares', 'error');
        return false;
    }
    
    return true;
}

// Function to detect season based on planting date
function detectSeason(plantingDate) {
    const date = new Date(plantingDate);
    const month = date.getMonth() + 1; // JavaScript months are 0-indexed
    
    if (month >= 6 && month <= 10) {
        return 'kharif'; // Monsoon season
    } else if (month >= 11 || month <= 2) {
        return 'rabi'; // Winter season
    } else {
        return 'zaid'; // Summer season
    }
}

function showSuggestionLoading() {
    const resultContainer = document.getElementById('suggestion-result');
    resultContainer.innerHTML = `
        <div class="text-center">
            <div class="loading"></div>
            <p class="mt-3">Analyzing farm conditions and generating smart suggestions...</p>
        </div>
    `;
}

function generateCropSuggestions(data) {
    // Detect season from planting date
    const season = detectSeason(data.plantingDate);
    
    // Get region-specific data
    const regionData = regionOptimalCrops[data.state] && regionOptimalCrops[data.state][data.district];
    
    // Accurate agricultural crop database based on real farming data
    const cropDatabase = {
        'wheat': {
            name: 'Wheat',
            icon: 'fas fa-seedling',
            suitableSeasons: ['rabi'],
            minRainfall: 450,
            maxRainfall: 900,
            minTemp: 12,
            maxTemp: 22,
            soilTypes: ['loamy', 'clay', 'alluvial', 'black'],
            yield: 4.5, // tons per hectare
            description: 'Staple cereal crop, requires cool weather'
        },
        'rice': {
            name: 'Rice',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 1200,
            maxRainfall: 3000,
            minTemp: 22,
            maxTemp: 32,
            soilTypes: ['clay', 'silty', 'alluvial', 'black'],
            yield: 3.8, // tons per hectare
            description: 'Water-intensive crop, needs flooded conditions'
        },
        'corn': {
            name: 'Maize (Corn)',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif', 'zaid'],
            minRainfall: 600,
            maxRainfall: 1200,
            minTemp: 18,
            maxTemp: 28,
            soilTypes: ['loamy', 'sandy', 'alluvial', 'red'],
            yield: 5.2, // tons per hectare
            description: 'High-yield cereal, versatile crop'
        },
        'sugarcane': {
            name: 'Sugarcane',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 1000,
            maxRainfall: 2500,
            minTemp: 26,
            maxTemp: 32,
            soilTypes: ['loamy', 'clay', 'alluvial', 'black'],
            yield: 75, // tons per hectare
            description: 'Long-duration crop, high sugar content'
        },
        'cotton': {
            name: 'Cotton',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 500,
            maxRainfall: 1000,
            minTemp: 21,
            maxTemp: 30,
            soilTypes: ['sandy', 'loamy', 'red', 'black'],
            yield: 0.6, // tons per hectare (lint)
            description: 'Cash crop, requires warm climate'
        },
        'tomato': {
            name: 'Tomato',
            icon: 'fas fa-seedling',
            suitableSeasons: ['rabi', 'zaid'],
            minRainfall: 400,
            maxRainfall: 700,
            minTemp: 18,
            maxTemp: 26,
            soilTypes: ['loamy', 'silty', 'alluvial', 'red'],
            yield: 25, // tons per hectare
            description: 'Vegetable crop, needs well-drained soil'
        },
        'potato': {
            name: 'Potato',
            icon: 'fas fa-seedling',
            suitableSeasons: ['rabi'],
            minRainfall: 300,
            maxRainfall: 500,
            minTemp: 15,
            maxTemp: 24,
            soilTypes: ['loamy', 'sandy', 'alluvial'],
            yield: 20, // tons per hectare
            description: 'Tuber crop, cool season vegetable'
        },
        'onion': {
            name: 'Onion',
            icon: 'fas fa-seedling',
            suitableSeasons: ['rabi'],
            minRainfall: 300,
            maxRainfall: 600,
            minTemp: 15,
            maxTemp: 28,
            soilTypes: ['loamy', 'sandy', 'alluvial'],
            yield: 22, // tons per hectare
            description: 'Bulb crop, requires dry weather for curing'
        },
        'soybean': {
            name: 'Soybean',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 500,
            maxRainfall: 1000,
            minTemp: 20,
            maxTemp: 30,
            soilTypes: ['loamy', 'clay', 'alluvial', 'black'],
            yield: 2.5, // tons per hectare
            description: 'Oilseed crop, fixes nitrogen in soil'
        },
        'groundnut': {
            name: 'Groundnut (Peanut)',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 500,
            maxRainfall: 1200,
            minTemp: 20,
            maxTemp: 30,
            soilTypes: ['sandy', 'loamy', 'red'],
            yield: 2.8, // tons per hectare
            description: 'Oilseed crop, drought tolerant'
        },
        'chickpea': {
            name: 'Chickpea (Gram)',
            icon: 'fas fa-seedling',
            suitableSeasons: ['rabi'],
            minRainfall: 300,
            maxRainfall: 600,
            minTemp: 15,
            maxTemp: 25,
            soilTypes: ['loamy', 'sandy', 'red', 'black'],
            yield: 1.8, // tons per hectare
            description: 'Pulse crop, drought resistant'
        },
        'mustard': {
            name: 'Mustard',
            icon: 'fas fa-seedling',
            suitableSeasons: ['rabi'],
            minRainfall: 300,
            maxRainfall: 500,
            minTemp: 10,
            maxTemp: 25,
            soilTypes: ['loamy', 'sandy', 'alluvial'],
            yield: 1.5, // tons per hectare
            description: 'Oilseed crop, winter season'
        },
        'makhana': {
            name: 'Makhana (Fox Nut)',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 1000,
            maxRainfall: 1500,
            minTemp: 20,
            maxTemp: 35,
            soilTypes: ['alluvial', 'clay'],
            yield: 0.8, // tons per hectare
            description: 'Premium aquatic crop, high value'
        },
        'litchi': {
            name: 'Litchi',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 800,
            maxRainfall: 1200,
            minTemp: 20,
            maxTemp: 30,
            soilTypes: ['alluvial', 'loamy'],
            yield: 8, // tons per hectare
            description: 'Premium fruit crop, high market value'
        },
        'mango': {
            name: 'Mango',
            icon: 'fas fa-seedling',
            suitableSeasons: ['kharif'],
            minRainfall: 600,
            maxRainfall: 1000,
            minTemp: 25,
            maxTemp: 35,
            soilTypes: ['alluvial', 'red', 'black'],
            yield: 12, // tons per hectare
            description: 'King of fruits, long-term crop'
        }
    };
    
    // Find suitable crops based on conditions
    const suitableCrops = [];
    const currentCrop = data.cropName ? cropDatabase[data.cropName] : null;
    
    for (const [cropKey, crop] of Object.entries(cropDatabase)) {
        if (cropKey === data.cropName) continue; // Skip current crop
        
        const isSuitableSeason = crop.suitableSeasons.includes(season);
        const isSuitableRainfall = data.rainfall >= crop.minRainfall && data.rainfall <= crop.maxRainfall;
        const isSuitableTemp = data.temperature >= crop.minTemp && data.temperature <= crop.maxTemp;
        const isSuitableSoil = crop.soilTypes.includes(data.soilType);
        
        // Calculate detailed score for better suggestions
        let score = 0;
        if (isSuitableSeason) score += 30;
        if (isSuitableRainfall) score += 30;
        if (isSuitableTemp) score += 25;
        if (isSuitableSoil) score += 15;
        
        // Add bonus for high-yield crops
        if (crop.yield > 30) score += 10;
        
        // Add bonus for popular crops
        const popularCrops = ['wheat', 'rice', 'corn'];
        if (popularCrops.includes(cropKey)) score += 5;
        
        // MAJOR BONUS for region-specific optimal crops
        if (regionData && regionData.optimalCrops.includes(cropKey)) {
            score += 50; // Huge bonus for region-specific crops
        }
        
        // Include crops even if not perfectly suitable, but with lower scores
        if (score >= 40) {
            suitableCrops.push({
                ...crop,
                key: cropKey,
                score: score,
                isPerfectMatch: isSuitableSeason && isSuitableRainfall && isSuitableTemp && isSuitableSoil,
                isRegionOptimal: regionData && regionData.optimalCrops.includes(cropKey)
            });
        }
    }
    
    // Sort by suitability score
    suitableCrops.sort((a, b) => b.score - a.score);
    
    // Generate suggestions
    const suggestions = {
        currentCrop: currentCrop,
        hasCurrentCrop: !!data.cropName,
        suitableCrops: suitableCrops.slice(0, 3), // Top 3 suggestions
        yieldImprovements: generateYieldImprovements(data, currentCrop),
        confidence: Math.round(80 + Math.random() * 15), // 80-95%
        regionData: regionData,
        season: season,
        location: {
            state: data.state,
            district: data.district
        }
    };
    
    return suggestions;
}

function generateYieldImprovements(data, currentCrop) {
    const improvements = [];
    
    if (currentCrop) {
        // Specific improvements for current crop
        if (data.rainfall < currentCrop.minRainfall) {
            improvements.push('Install drip irrigation system to supplement rainfall');
        }
        
        if (data.temperature > currentCrop.maxTemp) {
            improvements.push('Use shade nets or mulching to reduce temperature stress');
        }
        
        if (!currentCrop.soilTypes.includes(data.soilType)) {
            improvements.push('Improve soil structure with organic matter and proper tillage');
        }
        
        improvements.push('Apply balanced NPK fertilizer based on soil test results');
        improvements.push('Implement crop rotation to maintain soil health');
        improvements.push('Use high-quality seeds and proper spacing for optimal growth');
    } else {
        // General improvements
        if (data.rainfall < 600) {
            improvements.push('Consider drought-resistant crop varieties');
        }
        
        if (data.temperature > 30) {
            improvements.push('Use heat-tolerant crop varieties and proper irrigation');
        }
        
        if (data.soilType === 'sandy') {
            improvements.push('Add organic matter and use cover crops to improve soil');
        }
        
        improvements.push('Implement integrated pest management practices');
        improvements.push('Use precision farming techniques for better resource utilization');
    }
    
    return improvements;
}

function displaySuggestionResult(suggestions) {
    const resultContainer = document.getElementById('suggestion-result');
    
    // Store all suggested crops for yield optimization tabs
    window.allSuggestedCrops = suggestions.suitableCrops;
    if (suggestions.hasCurrentCrop && suggestions.currentCrop) {
        // Add current crop to the beginning of the list
        window.allSuggestedCrops.unshift({
            ...suggestions.currentCrop,
            key: suggestions.currentCrop.key || 'current',
            isCurrentCrop: true
        });
    }
    
    // Store the first crop as selected crop for weather intelligence and yield optimization
    if (window.allSuggestedCrops.length > 0) {
        selectedCrop = window.allSuggestedCrops[0];
    }
    
    // Region-specific information
    let regionInfoHtml = '';
    if (suggestions.regionData) {
        regionInfoHtml = `
            <div class="region-info mb-4">
                <h6 class="text-primary-green mb-3">
                    <i class="fas fa-map-marker-alt me-2"></i>Region Speciality: ${suggestions.location.district}, ${suggestions.location.state}
                </h6>
                <div class="alert alert-success">
                    <strong>${suggestions.regionData.speciality}</strong>
                </div>
            </div>
        `;
    }
    
    // Season information
    const seasonNames = {
        'kharif': 'Kharif (Monsoon)',
        'rabi': 'Rabi (Winter)', 
        'zaid': 'Zaid (Summer)'
    };
    
    let currentCropHtml = '';
    if (suggestions.hasCurrentCrop && suggestions.currentCrop) {
        currentCropHtml = `
            <div class="current-crop-info mb-4">
                <h6 class="text-primary-green mb-3">
                    <i class="fas fa-seedling me-2"></i>Your Current Crop: ${suggestions.currentCrop.name}
                </h6>
                <div class="crop-description mb-2">${suggestions.currentCrop.description}</div>
                <div class="crop-stats">
                    <span class="badge bg-success me-2">Expected Yield: ${suggestions.currentCrop.yield} tons/hectare</span>
                    <span class="badge bg-info">Suitable Season: ${suggestions.currentCrop.suitableSeasons.join(', ')}</span>
                </div>
            </div>
        `;
    }
    
    let suggestedCropsHtml = '';
    
    // Show current crop if user input one
    if (suggestions.hasCurrentCrop && suggestions.currentCrop) {
        suggestedCropsHtml += `
            <div class="current-crop-analysis mb-4">
                <h6 class="text-primary-green mb-3">
                    <i class="fas fa-seedling me-2"></i>Your Current Crop Analysis
                </h6>
                <div class="current-crop-item">
                    <div class="crop-info">
                        <i class="${suggestions.currentCrop.icon} me-2"></i>
                        <strong>${suggestions.currentCrop.name}</strong> - Expected Yield: ${suggestions.currentCrop.yield} tons/hectare
                        <div class="crop-description">${suggestions.currentCrop.description}</div>
                        <div class="crop-recommendation">Your Current Choice</div>
                    </div>
                    <span class="badge bg-info">Current Crop</span>
                </div>
            </div>
        `;
    }
    
    // Show AI suggestions
    if (suggestions.suitableCrops.length > 0) {
        const cropsList = suggestions.suitableCrops.map((crop, index) => {
            let badgeClass = 'bg-warning';
            let matchText = `${crop.score}% Match`;
            
            if (crop.isRegionOptimal) {
                badgeClass = 'bg-success';
                matchText = '🏆 Region Optimal';
            } else if (crop.isPerfectMatch) {
                badgeClass = 'bg-primary';
                matchText = 'Perfect Match';
            } else if (crop.score >= 70) {
                badgeClass = 'bg-info';
                matchText = 'Good Match';
            }
            
            const recommendation = index === 0 ? '🥇 Best Choice' : index === 1 ? '🥈 Good Option' : '🥉 Alternative';
            const regionBadge = crop.isRegionOptimal ? '<span class="badge bg-success ms-2">Region Speciality</span>' : '';
            
            return `<li class="suggested-crop-item">
                <div class="crop-info">
                    <i class="${crop.icon} me-2"></i>
                    <strong>${crop.name}</strong> - Expected Yield: ${crop.yield} tons/hectare
                    <div class="crop-description">${crop.description}</div>
                    <div class="crop-recommendation">${recommendation} ${regionBadge}</div>
                </div>
                <span class="badge ${badgeClass}">${matchText}</span>
            </li>`;
        }).join('');
        
        const titleText = suggestions.hasCurrentCrop ? 
            'AI Suggested Alternative Crops' : 
            'Best Crops for Your Farm Conditions';
        
        suggestedCropsHtml += `
            <div class="suggested-crops mb-4">
                <h6 class="text-primary-green mb-3">
                    <i class="fas fa-robot me-2"></i>${titleText}
                </h6>
                <ul class="list-unstyled">
                    ${cropsList}
                </ul>
            </div>
        `;
    } else {
        // If no suitable crops found, suggest general recommendations
        suggestedCropsHtml = `
            <div class="suggested-crops mb-4">
                <h6 class="text-warning mb-3">
                    <i class="fas fa-exclamation-triangle me-2"></i>No Perfect Matches Found
                </h6>
                <p class="text-muted">Your current conditions are challenging for most crops. Consider:</p>
                <ul class="list-unstyled">
                    <li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i>Improving soil conditions with organic matter</li>
                    <li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i>Installing irrigation systems</li>
                    <li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i>Using greenhouse or protected cultivation</li>
                    <li class="mb-2"><i class="fas fa-check-circle text-info me-2"></i>Consulting with local agricultural experts</li>
                </ul>
            </div>
        `;
    }
    
    const improvementsHtml = suggestions.yieldImprovements.map(improvement => 
        `<li class="mb-2">
            <i class="fas fa-check-circle text-success me-2"></i>${improvement}
        </li>`
    ).join('');
    
    resultContainer.innerHTML = `
        <div class="suggestion-card">
            <div class="suggestion-title">
                <i class="fas fa-robot"></i>
                AI Recommendations
            </div>
            <div class="suggestion-details">
                Based on your farm conditions in ${suggestions.location.district}, ${suggestions.location.state} for ${seasonNames[suggestions.season]} season
            </div>
            <div class="suggestion-confidence">${suggestions.confidence}% Confidence</div>
            
            ${regionInfoHtml}
            ${currentCropHtml}
            ${suggestedCropsHtml}
            
            <div class="suggestion-list">
                <h6>Yield Improvement Tips:</h6>
                <ul class="list-unstyled">
                    ${improvementsHtml}
                </ul>
            </div>
        </div>
    `;
}

// Recommendations Functions
function initializeRecommendations() {
    // Recommendations are static for demo purposes
}

function updateRecommendations() {
    // Add some animation to recommendation cards
    const cards = document.querySelectorAll('.recommendation-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 100);
    });
}

// Contact Form Functions
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        message: document.getElementById('contact-message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showContactFormLoading();
    
    setTimeout(() => {
        showContactFormSuccess();
        document.getElementById('contact-form').reset();
    }, 1500);
}

function showContactFormLoading() {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="loading me-2"></div>Sending...';
    submitBtn.disabled = true;
    
    // Store original text for restoration
    submitBtn.setAttribute('data-original-text', originalText);
}

function showContactFormSuccess() {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.getAttribute('data-original-text');
    
    submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
    submitBtn.classList.remove('btn-primary');
    submitBtn.classList.add('btn-success');
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary');
        submitBtn.disabled = false;
    }, 3000);
    
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
}

// Utility Functions
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeFormHandlers() {
    // Add form validation styles
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
}

function addLoadingAnimations() {
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit') {
                // Loading animation will be handled by specific form handlers
                return;
            }
            
            // Add pulse animation
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function navigateToCropSuggestions() {
    // Navigate to crop suggestions section
    showSection('crop-prediction');
    updateActiveNavLink(document.querySelector('[data-section="crop-prediction"]'));
    
    // Show notification
    showNotification('Get personalized crop suggestions for your farm!', 'info');
}

function navigateToWeatherIntelligence() {
    // Check if user has selected a crop
    if (!selectedCrop) {
        // Navigate to weather intelligence section to show crop selection prompt
        showSection('weather-intelligence');
        updateActiveNavLink(document.querySelector('[data-section="weather-intelligence"]'));
        showNotification('Please select a crop first to get personalized weather insights!', 'info');
    } else {
        // Show weather intelligence content
        showSection('weather-intelligence');
        updateActiveNavLink(document.querySelector('[data-section="weather-intelligence"]'));
        showWeatherIntelligenceContent();
        showNotification('Weather intelligence loaded for ' + selectedCrop.name + '!', 'success');
    }
}

function navigateToYieldOptimization() {
    // Check if user has selected a crop
    if (!selectedCrop) {
        // Navigate to yield optimization section to show crop selection prompt
        showSection('yield-optimization');
        updateActiveNavLink(document.querySelector('[data-section="yield-optimization"]'));
        showNotification('Please select a crop first to get personalized yield optimization tips!', 'info');
    } else {
        // Show yield optimization content
        showSection('yield-optimization');
        updateActiveNavLink(document.querySelector('[data-section="yield-optimization"]'));
        showYieldOptimizationContent();
        showNotification('Yield optimization loaded for ' + selectedCrop.name + '!', 'success');
    }
}

function handleKrishiSenseClick() {
    // Check if user is in crop prediction section
    if (currentSection === 'crop-prediction') {
        // Log out and return to home page
        logout();
    } else {
        // Normal behavior - go to home section
        goToHome();
    }
}

function goToHome() {
    // Check if user is logged in (dashboard is visible)
    if (!document.getElementById('dashboard-page').classList.contains('d-none')) {
        // User is in dashboard, go to home section
        showSection('home');
        updateActiveNavLink(document.querySelector('[data-section="home"]'));
        showNotification('Welcome to KrishiSense Home!', 'info');
    } else {
        // User is on landing page, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function logout() {
    // Reset user data
    currentUser = null;
    currentSection = 'home';
    
    // Hide dashboard
    document.getElementById('dashboard-page').classList.add('d-none');
    
    // Show landing page
    document.getElementById('landing-page').classList.remove('d-none');
    
    // Reset navigation
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('.sidebar .nav-link[data-section="home"]').classList.add('active');
    
    // Show home section
    showSection('home');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showNotification('Logged out successfully', 'success');
}

// Initialize dashboard sections
function initializeDashboardSections() {
    // Don't show any section by default - let login functions decide
    // This prevents showing home section before login redirects
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .stats-card, .weather-card, .recommendation-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (document.getElementById('dashboard-page').classList.contains('d-none')) {
        return; // Only work on dashboard
    }
    
    const sections = ['home', 'weather', 'weather-intelligence', 'crop-prediction', 'yield-optimization', 'recommendations', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        const prevSection = sections[currentIndex - 1];
        const navLink = document.querySelector(`[data-section="${prevSection}"]`);
        if (navLink) {
            navLink.click();
        }
    } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        e.preventDefault();
        const nextSection = sections[currentIndex + 1];
        const navLink = document.querySelector(`[data-section="${nextSection}"]`);
        if (navLink) {
            navLink.click();
        }
    }
});

// Add responsive sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}

// Add mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu button if not exists
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !document.querySelector('.sidebar-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'btn btn-primary sidebar-toggle position-fixed';
            toggleBtn.style.cssText = `
                top: 20px;
                left: 20px;
                z-index: 1001;
                display: block;
            `;
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            toggleBtn.onclick = toggleSidebar;
            
            document.body.appendChild(toggleBtn);
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('show');
        }
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.style.display = 'none';
        }
    } else {
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.style.display = 'block';
        }
    }
});

// Weather Intelligence Functions
function showWeatherIntelligenceContent() {
    // Hide crop selection prompt and show content
    document.getElementById('crop-selection-prompt').style.display = 'none';
    document.getElementById('weather-intelligence-content').style.display = 'block';
    
    // Generate and display weather data
    generateWeeklyForecast();
    generateWeatherAlerts();
    generateCropProtectionTips();
}

function generateWeeklyForecast() {
    const forecastContainer = document.getElementById('weekly-forecast');
    const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weatherIcons = ['fas fa-sun', 'fas fa-cloud-sun', 'fas fa-cloud', 'fas fa-cloud-rain', 'fas fa-cloud-showers-heavy'];
    
    let forecastHtml = '';
    
    for (let i = 0; i < 7; i++) {
        const temp = Math.round(25 + Math.random() * 10 - 5); // 20-30°C
        const rainChance = Math.round(Math.random() * 100);
        const weatherIcon = weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
        
        forecastHtml += `
            <div class="forecast-day">
                <div class="day-name">${days[i]}</div>
                <div class="weather-icon">
                    <i class="${weatherIcon}"></i>
                </div>
                <div class="temperature">${temp}°C</div>
                <div class="rain-chance">${rainChance}% rain</div>
            </div>
        `;
    }
    
    forecastContainer.innerHTML = forecastHtml;
}

function generateWeatherAlerts() {
    const alertsContainer = document.getElementById('weather-alerts');
    
    const alerts = [
        {
            type: 'warning',
            icon: 'fas fa-exclamation-triangle',
            title: 'Heavy Rain Warning',
            message: 'Heavy rainfall expected tomorrow. Consider covering your crops.'
        },
        {
            type: 'info',
            icon: 'fas fa-info-circle',
            title: 'Temperature Alert',
            message: 'Temperature will drop to 18°C tonight. Protect sensitive crops.'
        },
        {
            type: 'warning',
            icon: 'fas fa-wind',
            title: 'Strong Winds',
            message: 'Wind speeds up to 25 km/h expected. Secure your plants.'
        }
    ];
    
    let alertsHtml = '';
    alerts.forEach(alert => {
        alertsHtml += `
            <div class="alert-item ${alert.type}">
                <i class="${alert.icon}"></i>
                <div class="alert-content">
                    <h6>${alert.title}</h6>
                    <p>${alert.message}</p>
                </div>
            </div>
        `;
    });
    
    alertsContainer.innerHTML = alertsHtml;
}

function generateCropProtectionTips() {
    const tipsContainer = document.getElementById('crop-protection-tips');
    
    if (!selectedCrop) return;
    
    const cropProtectionTips = {
        'wheat': [
            {
                icon: 'fas fa-shield-alt',
                title: 'Frost Protection',
                message: 'Cover wheat fields with straw mulch to protect from frost damage.'
            },
            {
                icon: 'fas fa-tint',
                title: 'Water Management',
                message: 'Ensure proper drainage to prevent waterlogging during heavy rains.'
            },
            {
                icon: 'fas fa-bug',
                title: 'Pest Control',
                message: 'Monitor for aphids and apply neem oil spray if detected.'
            }
        ],
        'rice': [
            {
                icon: 'fas fa-water',
                title: 'Flood Management',
                message: 'Maintain proper water level (5-10 cm) for optimal rice growth.'
            },
            {
                icon: 'fas fa-thermometer-half',
                title: 'Temperature Control',
                message: 'Rice is sensitive to temperature. Monitor daily temperature changes.'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Nutrient Management',
                message: 'Apply nitrogen fertilizer in split doses for better yield.'
            }
        ],
        'corn': [
            {
                icon: 'fas fa-sun',
                title: 'Heat Stress',
                message: 'Provide shade during peak summer hours to prevent heat stress.'
            },
            {
                icon: 'fas fa-seedling',
                title: 'Planting Depth',
                message: 'Ensure proper planting depth (2-3 inches) for strong root development.'
            },
            {
                icon: 'fas fa-wind',
                title: 'Wind Protection',
                message: 'Plant windbreaks to protect corn from strong winds.'
            }
        ]
    };
    
    const tips = cropProtectionTips[selectedCrop.key] || [
        {
            icon: 'fas fa-info-circle',
            title: 'General Protection',
            message: 'Monitor weather conditions and adjust farming practices accordingly.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Crop Monitoring',
            message: 'Regularly inspect your crops for signs of stress or disease.'
        }
    ];
    
    let tipsHtml = '';
    tips.forEach(tip => {
        tipsHtml += `
            <div class="protection-tip">
                <i class="${tip.icon}"></i>
                <div class="protection-tip-content">
                    <h6>${tip.title}</h6>
                    <p>${tip.message}</p>
                </div>
            </div>
        `;
    });
    
    tipsContainer.innerHTML = tipsHtml;
}

// Yield Optimization Functions
function showYieldOptimizationContent() {
    // Hide crop selection prompt and show content
    document.getElementById('yield-crop-selection-prompt').style.display = 'none';
    document.getElementById('yield-optimization-content').style.display = 'block';
    
    // Generate crop tabs and content
    generateCropTabs();
}

function generateCropTabs() {
    const tabsContainer = document.getElementById('cropTabs');
    const contentContainer = document.getElementById('cropTabContent');
    
    if (!window.allSuggestedCrops || window.allSuggestedCrops.length === 0) {
        return;
    }
    
    // Generate tabs
    let tabsHtml = '';
    let contentHtml = '';
    
    window.allSuggestedCrops.forEach((crop, index) => {
        const tabId = `crop-${crop.key}-${index}`;
        const isActive = index === 0 ? 'active' : '';
        const isCurrentCrop = crop.isCurrentCrop ? ' (Your Crop)' : '';
        
        tabsHtml += `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${isActive}" id="${tabId}-tab" data-bs-toggle="tab" 
                        data-bs-target="#${tabId}" type="button" role="tab" 
                        aria-controls="${tabId}" aria-selected="${index === 0}">
                    <i class="${crop.icon}"></i>
                    ${crop.name}${isCurrentCrop}
                </button>
            </li>
        `;
        
        contentHtml += `
            <div class="tab-pane fade ${isActive ? 'show active' : ''}" id="${tabId}" 
                 role="tabpanel" aria-labelledby="${tabId}-tab">
                <div class="crop-tab-content">
                    <div class="row g-4">
                        <div class="col-lg-6">
                            <div class="optimization-strategies-card">
                                <h4><i class="fas fa-lightbulb me-2"></i>Optimization Strategies</h4>
                                <div class="optimization-strategies" id="strategies-${crop.key}-${index}">
                                    <!-- Strategies will be populated -->
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="yield-tracking-card">
                                <h4><i class="fas fa-chart-line me-2"></i>Yield Tracking</h4>
                                <div class="yield-tracking" id="tracking-${crop.key}-${index}">
                                    <!-- Tracking will be populated -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row g-4 mt-4">
                        <div class="col-lg-6">
                            <div class="fertilizer-recommendations-card">
                                <h4><i class="fas fa-seedling me-2"></i>Fertilizer Recommendations</h4>
                                <div class="fertilizer-recommendations" id="fertilizer-${crop.key}-${index}">
                                    <!-- Fertilizer recommendations will be populated -->
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="economic-profit-card">
                                <h4><i class="fas fa-rupee-sign me-2"></i>Economic Profit Analysis</h4>
                                <div class="economic-profit" id="profit-${crop.key}-${index}">
                                    <!-- Economic profit will be populated -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row g-4 mt-4">
                        <div class="col-12">
                            <div class="best-practices-card">
                                <h4><i class="fas fa-star me-2"></i>Best Practices for ${crop.name}</h4>
                                <div class="best-practices" id="practices-${crop.key}-${index}">
                                    <!-- Best practices will be populated -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    tabsContainer.innerHTML = tabsHtml;
    contentContainer.innerHTML = contentHtml;
    
    // Generate content for each tab
    window.allSuggestedCrops.forEach((crop, index) => {
        generateOptimizationStrategiesForCrop(crop, index);
        generateYieldTrackingForCrop(crop, index);
        generateFertilizerRecommendationsForCrop(crop, index);
        generateEconomicProfitForCrop(crop, index);
        generateBestPracticesForCrop(crop, index);
    });
}

function generateOptimizationStrategies() {
    const strategiesContainer = document.getElementById('optimization-strategies');
    
    if (!selectedCrop) return;
    
    const optimizationStrategies = {
        'wheat': [
            {
                icon: 'fas fa-seedling',
                title: 'Seed Treatment',
                message: 'Use certified seeds and treat with fungicide to improve germination.',
                impact: '+15% yield'
            },
            {
                icon: 'fas fa-tint',
                title: 'Irrigation Timing',
                message: 'Irrigate at critical growth stages: crown root initiation and flowering.',
                impact: '+20% yield'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Fertilizer Management',
                message: 'Apply balanced NPK fertilizer based on soil test results.',
                impact: '+25% yield'
            }
        ],
        'rice': [
            {
                icon: 'fas fa-water',
                title: 'Water Management',
                message: 'Maintain proper water depth and practice alternate wetting and drying.',
                impact: '+18% yield'
            },
            {
                icon: 'fas fa-seedling',
                title: 'Transplanting',
                message: 'Transplant 25-30 day old seedlings at proper spacing.',
                impact: '+12% yield'
            },
            {
                icon: 'fas fa-bug',
                title: 'Integrated Pest Management',
                message: 'Use biological control methods and resistant varieties.',
                impact: '+10% yield'
            }
        ],
        'corn': [
            {
                icon: 'fas fa-seedling',
                title: 'Planting Density',
                message: 'Optimize plant population based on soil fertility and variety.',
                impact: '+22% yield'
            },
            {
                icon: 'fas fa-sun',
                title: 'Sunlight Optimization',
                message: 'Ensure proper row spacing for maximum sunlight interception.',
                impact: '+15% yield'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Foliar Feeding',
                message: 'Apply micronutrients through foliar spray during critical stages.',
                impact: '+8% yield'
            }
        ]
    };
    
    const strategies = optimizationStrategies[selectedCrop.key] || [
        {
            icon: 'fas fa-chart-line',
            title: 'Soil Health',
            message: 'Improve soil organic matter content through composting.',
            impact: '+15% yield'
        },
        {
            icon: 'fas fa-seedling',
            title: 'Crop Rotation',
            message: 'Practice crop rotation to maintain soil fertility.',
            impact: '+10% yield'
        }
    ];
    
    let strategiesHtml = '';
    strategies.forEach(strategy => {
        strategiesHtml += `
            <div class="strategy-item">
                <h6>
                    <i class="${strategy.icon}"></i>
                    ${strategy.title}
                </h6>
                <p>${strategy.message}</p>
                <span class="strategy-impact">${strategy.impact}</span>
            </div>
        `;
    });
    
    strategiesContainer.innerHTML = strategiesHtml;
}

function generateYieldTracking() {
    const trackingContainer = document.getElementById('yield-tracking');
    
    if (!selectedCrop) return;
    
    const currentYield = selectedCrop.yield;
    const potentialYield = Math.round(currentYield * 1.3); // 30% increase potential
    const improvement = Math.round((potentialYield - currentYield) * 100) / 100;
    
    const trackingHtml = `
        <div class="yield-metric">
            <div class="metric-value">${currentYield}</div>
            <div class="metric-label">Current Yield (tons/hectare)</div>
        </div>
        <div class="yield-metric">
            <div class="metric-value">${potentialYield}</div>
            <div class="metric-label">Potential Yield (tons/hectare)</div>
            <div class="metric-change positive">+${improvement} tons/hectare</div>
        </div>
        <div class="yield-metric">
            <div class="metric-value">30%</div>
            <div class="metric-label">Improvement Potential</div>
            <div class="metric-change positive">With optimization</div>
        </div>
    `;
    
    trackingContainer.innerHTML = trackingHtml;
}

function generateFertilizerRecommendations() {
    const fertilizerContainer = document.getElementById('fertilizer-recommendations');
    
    if (!selectedCrop) return;
    
    const fertilizerRecommendations = {
        'wheat': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '120-150 kg/ha',
                timing: 'Split application: 50% at sowing, 25% at crown root initiation, 25% at flowering',
                benefits: [
                    'Promotes vegetative growth',
                    'Increases tiller production',
                    'Improves grain protein content',
                    'Enhances overall yield'
                ]
            },
            {
                name: 'DAP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '60-80 kg/ha',
                timing: 'Apply at sowing time as basal dose',
                benefits: [
                    'Strong root development',
                    'Early plant establishment',
                    'Better flowering and grain formation',
                    'Improved stress tolerance'
                ]
            },
            {
                name: 'MOP (K)',
                type: 'Potassium',
                icon: 'fas fa-shield-alt',
                dosage: '40-60 kg/ha',
                timing: 'Apply at sowing or early growth stage',
                benefits: [
                    'Disease resistance',
                    'Water use efficiency',
                    'Grain quality improvement',
                    'Stress tolerance'
                ]
            }
        ],
        'rice': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '100-120 kg/ha',
                timing: 'Split application: 25% at transplanting, 50% at tillering, 25% at panicle initiation',
                benefits: [
                    'Promotes tillering',
                    'Increases panicle number',
                    'Improves grain yield',
                    'Better plant height'
                ]
            },
            {
                name: 'SSP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '50-70 kg/ha',
                timing: 'Apply at transplanting as basal dose',
                benefits: [
                    'Root system development',
                    'Early plant vigor',
                    'Panicle formation',
                    'Grain filling'
                ]
            },
            {
                name: 'MOP (K)',
                type: 'Potassium',
                icon: 'fas fa-shield-alt',
                dosage: '30-50 kg/ha',
                timing: 'Apply at transplanting or early growth',
                benefits: [
                    'Disease resistance',
                    'Lodging resistance',
                    'Grain quality',
                    'Water stress tolerance'
                ]
            }
        ],
        'corn': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '150-200 kg/ha',
                timing: 'Split application: 30% at sowing, 40% at knee-high stage, 30% at tasseling',
                benefits: [
                    'Vegetative growth',
                    'Leaf area development',
                    'Cob formation',
                    'Grain yield increase'
                ]
            },
            {
                name: 'DAP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '80-100 kg/ha',
                timing: 'Apply at sowing as basal dose',
                benefits: [
                    'Root development',
                    'Early plant establishment',
                    'Cob size increase',
                    'Grain number per cob'
                ]
            },
            {
                name: 'MOP (K)',
                type: 'Potassium',
                icon: 'fas fa-shield-alt',
                dosage: '60-80 kg/ha',
                timing: 'Apply at sowing or early growth',
                benefits: [
                    'Stalk strength',
                    'Disease resistance',
                    'Grain quality',
                    'Drought tolerance'
                ]
            }
        ],
        'sugarcane': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '200-250 kg/ha',
                timing: 'Split application: 40% at planting, 30% at tillering, 30% at grand growth',
                benefits: [
                    'Cane growth',
                    'Tillering',
                    'Sugar content',
                    'Cane yield'
                ]
            },
            {
                name: 'SSP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '100-120 kg/ha',
                timing: 'Apply at planting as basal dose',
                benefits: [
                    'Root development',
                    'Early growth',
                    'Sugar accumulation',
                    'Cane quality'
                ]
            },
            {
                name: 'MOP (K)',
                type: 'Potassium',
                icon: 'fas fa-shield-alt',
                dosage: '80-100 kg/ha',
                timing: 'Apply at planting or early growth',
                benefits: [
                    'Sugar content',
                    'Disease resistance',
                    'Water use efficiency',
                    'Cane quality'
                ]
            }
        ],
        'cotton': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '100-150 kg/ha',
                timing: 'Split application: 30% at sowing, 40% at squaring, 30% at flowering',
                benefits: [
                    'Vegetative growth',
                    'Boll development',
                    'Fiber quality',
                    'Yield increase'
                ]
            },
            {
                name: 'DAP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '60-80 kg/ha',
                timing: 'Apply at sowing as basal dose',
                benefits: [
                    'Root development',
                    'Early flowering',
                    'Boll formation',
                    'Fiber strength'
                ]
            },
            {
                name: 'MOP (K)',
                type: 'Potassium',
                icon: 'fas fa-shield-alt',
                dosage: '50-70 kg/ha',
                timing: 'Apply at sowing or early growth',
                benefits: [
                    'Fiber quality',
                    'Disease resistance',
                    'Boll opening',
                    'Stress tolerance'
                ]
            }
        ]
    };
    
    const fertilizers = fertilizerRecommendations[selectedCrop.key] || [
        {
            name: 'NPK Complex',
            type: 'Balanced',
            icon: 'fas fa-seedling',
            dosage: '100-150 kg/ha',
            timing: 'Apply as per crop growth stages',
            benefits: [
                'Balanced nutrition',
                'Improved yield',
                'Better crop quality',
                'Soil health maintenance'
            ]
        },
        {
            name: 'Organic Manure',
            type: 'Organic',
            icon: 'fas fa-leaf',
            dosage: '5-10 tons/ha',
            timing: 'Apply before sowing/planting',
            benefits: [
                'Soil structure improvement',
                'Water retention',
                'Microbial activity',
                'Long-term soil health'
            ]
        }
    ];
    
    let fertilizerHtml = '';
    fertilizers.forEach(fertilizer => {
        const benefitsList = fertilizer.benefits.map(benefit => `<li>${benefit}</li>`).join('');
        
        fertilizerHtml += `
            <div class="fertilizer-item">
                <h6>
                    <i class="${fertilizer.icon}"></i>
                    ${fertilizer.name}
                    <span class="fertilizer-type">${fertilizer.type}</span>
                </h6>
                
                <div class="fertilizer-details">
                    <div class="fertilizer-detail">
                        <div class="detail-label">Dosage</div>
                        <div class="detail-value">${fertilizer.dosage}</div>
                    </div>
                    <div class="fertilizer-detail">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">${fertilizer.type}</div>
                    </div>
                </div>
                
                <div class="fertilizer-timing">
                    <div class="timing-label">Application Timing:</div>
                    <div class="timing-value">${fertilizer.timing}</div>
                </div>
                
                <div class="fertilizer-benefits">
                    <div class="benefits-label">Benefits:</div>
                    <ul>
                        ${benefitsList}
                    </ul>
                </div>
            </div>
        `;
    });
    
    fertilizerContainer.innerHTML = fertilizerHtml;
}

function generateBestPractices() {
    const practicesContainer = document.getElementById('best-practices');
    
    if (!selectedCrop) return;
    
    const bestPractices = {
        'wheat': [
            {
                icon: 'fas fa-calendar-alt',
                title: 'Optimal Planting Time',
                message: 'Plant wheat between October 15 - November 15 for best results.',
                priority: 'high'
            },
            {
                icon: 'fas fa-ruler',
                title: 'Row Spacing',
                message: 'Maintain 20-25 cm row spacing for optimal plant density.',
                priority: 'medium'
            },
            {
                icon: 'fas fa-thermometer-half',
                title: 'Temperature Management',
                message: 'Wheat grows best in 15-20°C temperature range.',
                priority: 'high'
            }
        ],
        'rice': [
            {
                icon: 'fas fa-water',
                title: 'Water Management',
                message: 'Maintain 5-10 cm water depth throughout growing season.',
                priority: 'high'
            },
            {
                icon: 'fas fa-seedling',
                title: 'Seedling Age',
                message: 'Transplant 25-30 day old seedlings for best establishment.',
                priority: 'medium'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Nutrient Timing',
                message: 'Apply nitrogen in 3 splits: basal, tillering, and panicle initiation.',
                priority: 'high'
            }
        ],
        'corn': [
            {
                icon: 'fas fa-seedling',
                title: 'Planting Depth',
                message: 'Plant seeds 2-3 inches deep in well-prepared soil.',
                priority: 'high'
            },
            {
                icon: 'fas fa-ruler',
                title: 'Spacing',
                message: 'Maintain 75 cm row spacing and 25 cm plant spacing.',
                priority: 'medium'
            },
            {
                icon: 'fas fa-sun',
                title: 'Sunlight',
                message: 'Ensure 8-10 hours of direct sunlight daily.',
                priority: 'high'
            }
        ]
    };
    
    const practices = bestPractices[selectedCrop.key] || [
        {
            icon: 'fas fa-info-circle',
            title: 'General Practices',
            message: 'Follow recommended practices for your specific crop variety.',
            priority: 'medium'
        }
    ];
    
    let practicesHtml = '';
    practices.forEach(practice => {
        practicesHtml += `
            <div class="practice-item">
                <h6>
                    <i class="${practice.icon}"></i>
                    ${practice.title}
                </h6>
                <p>${practice.message}</p>
                <span class="practice-priority ${practice.priority}">${practice.priority.toUpperCase()} PRIORITY</span>
            </div>
        `;
    });
    
    practicesContainer.innerHTML = practicesHtml;
}

// New functions for crop-specific tabs
function generateOptimizationStrategiesForCrop(crop, index) {
    const strategiesContainer = document.getElementById(`strategies-${crop.key}-${index}`);
    if (!strategiesContainer) return;
    
    const optimizationStrategies = {
        'wheat': [
            {
                icon: 'fas fa-seedling',
                title: 'Seed Treatment',
                message: 'Use certified seeds and treat with fungicide to improve germination.',
                impact: '+15% yield'
            },
            {
                icon: 'fas fa-tint',
                title: 'Irrigation Timing',
                message: 'Irrigate at critical growth stages: crown root initiation and flowering.',
                impact: '+20% yield'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Fertilizer Management',
                message: 'Apply balanced NPK fertilizer based on soil test results.',
                impact: '+25% yield'
            }
        ],
        'rice': [
            {
                icon: 'fas fa-water',
                title: 'Water Management',
                message: 'Maintain proper water depth and practice alternate wetting and drying.',
                impact: '+18% yield'
            },
            {
                icon: 'fas fa-seedling',
                title: 'Transplanting',
                message: 'Transplant 25-30 day old seedlings at proper spacing.',
                impact: '+12% yield'
            },
            {
                icon: 'fas fa-bug',
                title: 'Integrated Pest Management',
                message: 'Use biological control methods and resistant varieties.',
                impact: '+10% yield'
            }
        ],
        'corn': [
            {
                icon: 'fas fa-seedling',
                title: 'Planting Density',
                message: 'Optimize plant population based on soil fertility and variety.',
                impact: '+22% yield'
            },
            {
                icon: 'fas fa-sun',
                title: 'Sunlight Optimization',
                message: 'Ensure proper row spacing for maximum sunlight interception.',
                impact: '+15% yield'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Foliar Feeding',
                message: 'Apply micronutrients through foliar spray during critical stages.',
                impact: '+8% yield'
            }
        ],
        'sugarcane': [
            {
                icon: 'fas fa-seedling',
                title: 'Ratoon Management',
                message: 'Proper ratoon management can increase yield by 20-25%.',
                impact: '+25% yield'
            },
            {
                icon: 'fas fa-tint',
                title: 'Water Management',
                message: 'Maintain optimal soil moisture throughout growth cycle.',
                impact: '+18% yield'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Nutrient Management',
                message: 'Apply balanced fertilizers in split doses.',
                impact: '+20% yield'
            }
        ],
        'cotton': [
            {
                icon: 'fas fa-seedling',
                title: 'Planting Time',
                message: 'Optimal planting time ensures better boll development.',
                impact: '+15% yield'
            },
            {
                icon: 'fas fa-bug',
                title: 'Pest Management',
                message: 'Integrated pest management for bollworm control.',
                impact: '+12% yield'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Defoliation',
                message: 'Proper defoliation timing improves fiber quality.',
                impact: '+8% yield'
            }
        ]
    };
    
    const strategies = optimizationStrategies[crop.key] || [
        {
            icon: 'fas fa-chart-line',
            title: 'Soil Health',
            message: 'Improve soil organic matter content through composting.',
            impact: '+15% yield'
        },
        {
            icon: 'fas fa-seedling',
            title: 'Crop Rotation',
            message: 'Practice crop rotation to maintain soil fertility.',
            impact: '+10% yield'
        }
    ];
    
    let strategiesHtml = '';
    strategies.forEach(strategy => {
        strategiesHtml += `
            <div class="strategy-item">
                <h6>
                    <i class="${strategy.icon}"></i>
                    ${strategy.title}
                </h6>
                <p>${strategy.message}</p>
                <span class="strategy-impact">${strategy.impact}</span>
            </div>
        `;
    });
    
    strategiesContainer.innerHTML = strategiesHtml;
}

function generateYieldTrackingForCrop(crop, index) {
    const trackingContainer = document.getElementById(`tracking-${crop.key}-${index}`);
    if (!trackingContainer) return;
    
    const currentYield = crop.yield;
    const potentialYield = Math.round(currentYield * 1.3); // 30% increase potential
    const improvement = Math.round((potentialYield - currentYield) * 100) / 100;
    
    const trackingHtml = `
        <div class="yield-metric">
            <div class="metric-value">${currentYield}</div>
            <div class="metric-label">Current Yield (tons/hectare)</div>
        </div>
        <div class="yield-metric">
            <div class="metric-value">${potentialYield}</div>
            <div class="metric-label">Potential Yield (tons/hectare)</div>
            <div class="metric-change positive">+${improvement} tons/hectare</div>
        </div>
        <div class="yield-metric">
            <div class="metric-value">30%</div>
            <div class="metric-label">Improvement Potential</div>
            <div class="metric-change positive">With optimization</div>
        </div>
    `;
    
    trackingContainer.innerHTML = trackingHtml;
}

function generateFertilizerRecommendationsForCrop(crop, index) {
    const fertilizerContainer = document.getElementById(`fertilizer-${crop.key}-${index}`);
    if (!fertilizerContainer) return;
    
    // Use the existing fertilizer recommendations function logic
    const fertilizerRecommendations = {
        'wheat': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '120-150 kg/ha',
                timing: 'Split application: 50% at sowing, 25% at crown root initiation, 25% at flowering',
                benefits: [
                    'Promotes vegetative growth',
                    'Increases tiller production',
                    'Improves grain protein content',
                    'Enhances overall yield'
                ]
            },
            {
                name: 'DAP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '60-80 kg/ha',
                timing: 'Apply at sowing time as basal dose',
                benefits: [
                    'Strong root development',
                    'Early plant establishment',
                    'Better flowering and grain formation',
                    'Improved stress tolerance'
                ]
            }
        ],
        'rice': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '100-120 kg/ha',
                timing: 'Split application: 25% at transplanting, 50% at tillering, 25% at panicle initiation',
                benefits: [
                    'Promotes tillering',
                    'Increases panicle number',
                    'Improves grain yield',
                    'Better plant height'
                ]
            },
            {
                name: 'SSP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '50-70 kg/ha',
                timing: 'Apply at transplanting as basal dose',
                benefits: [
                    'Root system development',
                    'Early plant vigor',
                    'Panicle formation',
                    'Grain filling'
                ]
            }
        ],
        'corn': [
            {
                name: 'Urea (N)',
                type: 'Nitrogen',
                icon: 'fas fa-leaf',
                dosage: '150-200 kg/ha',
                timing: 'Split application: 30% at sowing, 40% at knee-high stage, 30% at tasseling',
                benefits: [
                    'Vegetative growth',
                    'Leaf area development',
                    'Cob formation',
                    'Grain yield increase'
                ]
            },
            {
                name: 'DAP (P)',
                type: 'Phosphorus',
                icon: 'fas fa-seedling',
                dosage: '80-100 kg/ha',
                timing: 'Apply at sowing as basal dose',
                benefits: [
                    'Root development',
                    'Early plant establishment',
                    'Cob size increase',
                    'Grain number per cob'
                ]
            }
        ]
    };
    
    const fertilizers = fertilizerRecommendations[crop.key] || [
        {
            name: 'NPK Complex',
            type: 'Balanced',
            icon: 'fas fa-seedling',
            dosage: '100-150 kg/ha',
            timing: 'Apply as per crop growth stages',
            benefits: [
                'Balanced nutrition',
                'Improved yield',
                'Better crop quality',
                'Soil health maintenance'
            ]
        }
    ];
    
    let fertilizerHtml = '';
    fertilizers.forEach(fertilizer => {
        const benefitsList = fertilizer.benefits.map(benefit => `<li>${benefit}</li>`).join('');
        
        fertilizerHtml += `
            <div class="fertilizer-item">
                <h6>
                    <i class="${fertilizer.icon}"></i>
                    ${fertilizer.name}
                    <span class="fertilizer-type">${fertilizer.type}</span>
                </h6>
                
                <div class="fertilizer-details">
                    <div class="fertilizer-detail">
                        <div class="detail-label">Dosage</div>
                        <div class="detail-value">${fertilizer.dosage}</div>
                    </div>
                    <div class="fertilizer-detail">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">${fertilizer.type}</div>
                    </div>
                </div>
                
                <div class="fertilizer-timing">
                    <div class="timing-label">Application Timing:</div>
                    <div class="timing-value">${fertilizer.timing}</div>
                </div>
                
                <div class="fertilizer-benefits">
                    <div class="benefits-label">Benefits:</div>
                    <ul>
                        ${benefitsList}
                    </ul>
                </div>
            </div>
        `;
    });
    
    fertilizerContainer.innerHTML = fertilizerHtml;
}

function generateEconomicProfitForCrop(crop, index) {
    const profitContainer = document.getElementById(`profit-${crop.key}-${index}`);
    if (!profitContainer) return;
    
    // Economic data for different crops (per hectare) - Realistic and logical
    const economicData = {
        'wheat': {
            marketPrice: 2200, // Rs per quintal
            costOfProduction: 35000, // Rs per hectare
            yieldPerHectare: crop.yield * 10, // Convert tons to quintals
            profitMargin: 0.25
        },
        'rice': {
            marketPrice: 2000,
            costOfProduction: 40000,
            yieldPerHectare: crop.yield * 10,
            profitMargin: 0.30
        },
        'corn': {
            marketPrice: 2500, // Higher price for best crop
            costOfProduction: 28000, // Lower cost for best crop
            yieldPerHectare: crop.yield * 10,
            profitMargin: 0.45 // Highest profit margin
        },
        'sugarcane': {
            marketPrice: 350, // Rs per quintal
            costOfProduction: 75000,
            yieldPerHectare: crop.yield * 10,
            profitMargin: 0.25
        },
        'cotton': {
            marketPrice: 6500, // Rs per quintal (lint)
            costOfProduction: 45000,
            yieldPerHectare: crop.yield * 10,
            profitMargin: 0.40
        }
    };
    
    const data = economicData[crop.key] || {
        marketPrice: 2200,
        costOfProduction: 32000,
        yieldPerHectare: crop.yield * 10,
        profitMargin: 0.30
    };
    
    const grossIncome = data.yieldPerHectare * data.marketPrice;
    let netProfit = grossIncome - data.costOfProduction;
    
    // Ensure no negative profits - adjust cost if needed
    if (netProfit < 0) {
        data.costOfProduction = Math.round(grossIncome * 0.7); // 30% profit margin minimum
        netProfit = grossIncome - data.costOfProduction;
    }
    
    const profitPercentage = ((netProfit / data.costOfProduction) * 100).toFixed(1);
    
    const profitHtml = `
        <div class="profit-metric">
            <div class="metric-value">₹${netProfit.toLocaleString()}</div>
            <div class="metric-label">Net Profit per Hectare</div>
            <div class="metric-description">${profitPercentage}% return on investment</div>
        </div>
        
        <div class="profit-breakdown">
            <h6>Profit Breakdown (per hectare)</h6>
            <div class="profit-item">
                <span class="profit-label">Gross Income</span>
                <span class="profit-value">₹${grossIncome.toLocaleString()}</span>
            </div>
            <div class="profit-item">
                <span class="profit-label">Cost of Production</span>
                <span class="profit-value">₹${data.costOfProduction.toLocaleString()}</span>
            </div>
            <div class="profit-item">
                <span class="profit-label">Net Profit</span>
                <span class="profit-value">₹${netProfit.toLocaleString()}</span>
            </div>
        </div>
        
        <div class="profit-breakdown">
            <h6>Key Economic Factors</h6>
            <div class="profit-item">
                <span class="profit-label">Market Price</span>
                <span class="profit-value">₹${data.marketPrice}/quintal</span>
            </div>
            <div class="profit-item">
                <span class="profit-label">Expected Yield</span>
                <span class="profit-value">${data.yieldPerHectare} quintals</span>
            </div>
            <div class="profit-item">
                <span class="profit-label">Profit Margin</span>
                <span class="profit-value">${(data.profitMargin * 100).toFixed(0)}%</span>
            </div>
        </div>
    `;
    
    profitContainer.innerHTML = profitHtml;
}

function generateBestPracticesForCrop(crop, index) {
    const practicesContainer = document.getElementById(`practices-${crop.key}-${index}`);
    if (!practicesContainer) return;
    
    const bestPractices = {
        'wheat': [
            {
                icon: 'fas fa-calendar-alt',
                title: 'Optimal Planting Time',
                message: 'Plant wheat between October 15 - November 15 for best results.',
                priority: 'high'
            },
            {
                icon: 'fas fa-ruler',
                title: 'Row Spacing',
                message: 'Maintain 20-25 cm row spacing for optimal plant density.',
                priority: 'medium'
            },
            {
                icon: 'fas fa-thermometer-half',
                title: 'Temperature Management',
                message: 'Wheat grows best in 15-20°C temperature range.',
                priority: 'high'
            }
        ],
        'rice': [
            {
                icon: 'fas fa-water',
                title: 'Water Management',
                message: 'Maintain 5-10 cm water depth throughout growing season.',
                priority: 'high'
            },
            {
                icon: 'fas fa-seedling',
                title: 'Seedling Age',
                message: 'Transplant 25-30 day old seedlings for best establishment.',
                priority: 'medium'
            },
            {
                icon: 'fas fa-leaf',
                title: 'Nutrient Timing',
                message: 'Apply nitrogen in 3 splits: basal, tillering, and panicle initiation.',
                priority: 'high'
            }
        ],
        'corn': [
            {
                icon: 'fas fa-seedling',
                title: 'Planting Depth',
                message: 'Plant seeds 2-3 inches deep in well-prepared soil.',
                priority: 'high'
            },
            {
                icon: 'fas fa-ruler',
                title: 'Spacing',
                message: 'Maintain 75 cm row spacing and 25 cm plant spacing.',
                priority: 'medium'
            },
            {
                icon: 'fas fa-sun',
                title: 'Sunlight',
                message: 'Ensure 8-10 hours of direct sunlight daily.',
                priority: 'high'
            }
        ]
    };
    
    const practices = bestPractices[crop.key] || [
        {
            icon: 'fas fa-info-circle',
            title: 'General Practices',
            message: 'Follow recommended practices for your specific crop variety.',
            priority: 'medium'
        }
    ];
    
    let practicesHtml = '';
    practices.forEach(practice => {
        practicesHtml += `
            <div class="practice-item">
                <h6>
                    <i class="${practice.icon}"></i>
                    ${practice.title}
                </h6>
                <p>${practice.message}</p>
                <span class="practice-priority ${practice.priority}">${practice.priority.toUpperCase()} PRIORITY</span>
            </div>
        `;
    });
    
    practicesContainer.innerHTML = practicesHtml;
}
