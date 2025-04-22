"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Revised Category enum - removed Job, Property, Sport, and ElectronicsAppliance
enum Category {
  Car = "car",
  Bike = "bike",
  Mobile = "mobile",
  Electronic = "electronic",
  Furniture = "furniture",
  Fashion = "fashion",
  Book = "book",
  Cycle = "cycle",
  Laptop = "laptop",
  Toys = "toys",
  Fitness = "fitness",
  MusicalInstrument = "musicalInstrument",
  PetSupplies = "petSupplies",
  TV = "tv",
  Monitor = "monitor",
  Cooler = "cooler",
  Other = "other"
}

// Category icons mapping
const categoryIcons: Record<Category, string> = {
  [Category.Car]: "🚗",
  [Category.Bike]: "🏍️",
  [Category.Mobile]: "📱",
  [Category.Electronic]: "🔌",
  [Category.Furniture]: "🪑",
  [Category.Fashion]: "👕",
  [Category.Book]: "📚",
  [Category.Cycle]: "🚲",
  [Category.Laptop]: "💻",
  [Category.Toys]: "🧸",
  [Category.Fitness]: "🏋️",
  [Category.MusicalInstrument]: "🎸",
  [Category.PetSupplies]: "🐾",
  [Category.TV]: "📺",
  [Category.Monitor]: "🖥️",
  [Category.Cooler]: "❄️",
  [Category.Other]: "📦"
};

enum FormFieldType {
  Text = "text",
  Dropdown = "dropdown",
  Description = "description",
}

interface FormField {
  label: string;
  type: FormFieldType;
  options?: string[];
  keyboard?: string;
}

// Port of the Flutter util class to TypeScript - removed job, property, sport, and electronicsAppliance
const formCategories: Record<string, Record<string, FormField[]>> = {
  [Category.Bike]: {
    "Bike Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Honda", "Yamaha", "Suzuki"] },
      { label: "Year", type: FormFieldType.Text, keyboard: "number" },
      { label: "Fuel Type", type: FormFieldType.Dropdown, options: ["Petrol", "Electric"] },
      { label: "Km Driven", type: FormFieldType.Text, keyboard: "number" },
      { label: "Owner", type: FormFieldType.Dropdown, options: ["1st", "2nd", "3rd"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Car]: {
    "Car Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Hyundai", "Suzuki", "Toyota", "Mahindra", "Ford", "Tata", "Other"] },
      { label: "Year", type: FormFieldType.Text, keyboard: "number" },
      { label: "Fuel Type", type: FormFieldType.Dropdown, options: ["Diesel", "Petrol", "CNG", "Electric"] },
      { label: "Transmission", type: FormFieldType.Dropdown, options: ["Automated", "Manual"] },
      { label: "Km Driven", type: FormFieldType.Text, keyboard: "number" },
      { label: "Owner", type: FormFieldType.Dropdown, options: ["1st", "2nd", "3rd"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Cycle]: {
    "Cycle Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Hero", "Hercules", "BSA", "Firefox", "Avon", "Montra", "Btwin"] },
      { label: "Year", type: FormFieldType.Text, keyboard: "number" },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Laptop]: {
    "Laptop Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Apple", "Dell", "HP", "Asus", "Lenovo", "Redmi", "Samsung", "Other"] },
      { label: "Year", type: FormFieldType.Text, keyboard: "number" },
      { label: "RAM", type: FormFieldType.Dropdown, options: ["8GB", "16GB", "32GB", "64GB"] },
      { label: "Storage", type: FormFieldType.Dropdown, options: ["256GB", "512GB", "1TB"] },
      { label: "Processor", type: FormFieldType.Dropdown, options: ["M1 chip", "M2 chip", "Intel i3", "Intel i5", "Intel i7", "Intel i9", "AMD Ryzen 5"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Mobile]: {
    "Mobile Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Apple", "Realme", "Nokia", "Samsung", "Google Pixel", "Redmi", "Motorola", "OnePlus", "Oppo", "Other"] },
      { label: "Year", type: FormFieldType.Text, keyboard: "number" },
      { label: "RAM", type: FormFieldType.Dropdown, options: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB"] },
      { label: "Storage", type: FormFieldType.Dropdown, options: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Furniture]: {
    "Furniture Details": [
      { label: "Furniture Type", type: FormFieldType.Dropdown, options: ["Sofa", "Table", "Chair", "Bed", "Cupboard", "Shelf", "Dining Set", "Other"] },
      { label: "Material", type: FormFieldType.Dropdown, options: ["Wood", "Metal", "Plastic", "Glass", "Leather", "Fabric", "Other"] },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Good", "Used", "Needs Repair"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.TV]: {
    "TV Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Samsung", "Sony", "LG", "Panasonic", "Mi", "Other"] },
      { label: "Screen Size", type: FormFieldType.Text, keyboard: "text" },
      { label: "Smart TV", type: FormFieldType.Dropdown, options: ["Yes", "No"] },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Used"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Monitor]: {
    "Monitor Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Dell", "HP", "Lenovo", "Samsung", "LG", "Other"] },
      { label: "Screen Size", type: FormFieldType.Text, keyboard: "text" },
      { label: "Resolution", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Used"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Cooler]: {
    "Cooler Details": [
      { label: "Brand", type: FormFieldType.Dropdown, options: ["Symphony", "Bajaj", "Orient", "Kenstar", "Other"] },
      { label: "Tank Capacity", type: FormFieldType.Text, keyboard: "text" },
      { label: "Power Consumption", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Used"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Book]: {
    "Book Details": [
      { label: "Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Author", type: FormFieldType.Text, keyboard: "text" },
      { label: "Publisher", type: FormFieldType.Text, keyboard: "text" },
      { label: "Edition", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Used"] },
      { label: "Genre", type: FormFieldType.Text, keyboard: "text" },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.PetSupplies]: {
    "Pet Supplies Details": [
      { label: "Pet Type", type: FormFieldType.Dropdown, options: ["Dog", "Cat", "Bird", "Fish", "Small Animal", "Other"] },
      { label: "Product Type", type: FormFieldType.Dropdown, options: ["Food", "Toys", "Accessories", "Beds", "Grooming", "Other"] },
      { label: "Brand", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Used"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Toys]: {
    "Toys Details": [
      { label: "Category", type: FormFieldType.Dropdown, options: ["Action Figures", "Building Blocks", "Dolls", "Educational", "Outdoor", "Other"] },
      { label: "Age Group", type: FormFieldType.Dropdown, options: ["Infants", "Toddlers", "Kids", "Teens", "Adults"] },
      { label: "Brand", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Used"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  },
  [Category.Electronic]: {
    "Electronics Details": [
      { label: "Device Type", type: FormFieldType.Dropdown, options: ["Audio", "Camera", "Computer Accessory", "Gaming", "Home Electronics", "Other"] },
      { label: "Brand", type: FormFieldType.Text, keyboard: "text" },
      { label: "Model Number", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Used", "Refurbished"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  }
};

// Add basic form data for remaining categories
const basicCategories = [
  Category.Fashion, Category.Fitness, Category.MusicalInstrument, Category.Other
];

basicCategories.forEach(category => {
  formCategories[category] = {
    [`${category.charAt(0).toUpperCase() + category.slice(1)} Details`]: [
      { label: "Type", type: FormFieldType.Text, keyboard: "text" },
      { label: "Brand", type: FormFieldType.Text, keyboard: "text" },
      { label: "Condition", type: FormFieldType.Dropdown, options: ["New", "Like New", "Used"] },
      { label: "Ad Title", type: FormFieldType.Text, keyboard: "text" },
      { label: "Additional Information", type: FormFieldType.Description }
    ]
  };
});

const ListingPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryTabs, setCategoryTabs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [price, setPrice] = useState<string>("");
  
  // Update available tabs when category changes
  useEffect(() => {
    if (selectedCategory && formCategories[selectedCategory]) {
      const tabs = Object.keys(formCategories[selectedCategory]);
      setCategoryTabs(tabs);
      setActiveTab(tabs[0]);
      
      // Reset form values when category changes
      setFormValues({});
    }
  }, [selectedCategory]);
  
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleInputChange = (fieldLabel: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldLabel]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    
    if (!image) {
      alert("Please upload an image");
      return;
    }
    
    const data = new FormData();
    
    // Add common fields
    data.append("userId", userId || "");
    data.append("category", selectedCategory);
    data.append("image", image);
    data.append("price", price);
    
    // Add all form values
    Object.entries(formValues).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/add-product`, {
        method: "POST",
        body: data,
      });
      
      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        router.push(`/profile?userId=${userId}`);
      } else {
        alert(result.message || "Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  // Render form fields based on field type
  const renderField = (field: FormField) => {
    const { label, type, options } = field;
    
    switch (type) {
      case FormFieldType.Dropdown:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formValues[label] || ""}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required
            >
              <option value="">Select {label}</option>
              {options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
        
      case FormFieldType.Text:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={field.keyboard === "number" ? "number" : "text"}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formValues[label] || ""}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required
            />
          </div>
        );
        
      case FormFieldType.Description:
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32"
              value={formValues[label] || ""}
              onChange={(e) => handleInputChange(label, e.target.value)}
              required
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  // Function to render category card for the sidebar
  const renderCategoryCard = (category: Category) => {
    const isSelected = selectedCategory === category;
    const displayName = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');

    return (
      <div 
        key={category}
        onClick={() => handleCategorySelect(category)}
        className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
          isSelected 
            ? "bg-blue-100 border-2 border-blue-500 shadow-md" 
            : "bg-white border border-gray-200 hover:bg-gray-50"
        }`}
      >
        <div className="text-3xl mb-2">{categoryIcons[category]}</div>
        <span className="text-sm font-medium text-center">{displayName}</span>
      </div>
    );
  };
  
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-[#EDF0FD] to-white py-12 pt-20 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 bg-slate-500 text-white">
              <h1 className="text-3xl font-bold">Add New Product</h1>
              <p className="text-slate-200 mt-2">Fill in the details to list your product</p>
            </div>
            
            <div className="flex flex-col md:flex-row">
              {/* Category Sidebar */}
              <div className="md:w-64 p-6 bg-gray-50 border-r ">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 overflow-y-scroll max-h-screen scrollbar-hide">
                  {Object.values(Category).map((category) => (
                    renderCategoryCard(category as Category)
                  ))}
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1">
                <form onSubmit={handleSubmit}>
                  {/* Image Upload and Price */}
                  <div className="p-6 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Image Upload */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h2>
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">Drag and drop or click to upload</p>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageChange}
                              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Price Section */}
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h2>
                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                          <div className="mb-10">
                            <label className="block text-sm font-medium text-gray-700 mb-1 mt-5">Price</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">Rs</span>
                              </div>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-3"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                value={price}
                                onChange={handlePriceChange}
                                required
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">INR</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic Category Form */}
                  {selectedCategory ? (
                    <div className="p-6">
                      {/* Category tabs */}
                      <div className="mb-6 border-b">
                        <div className="flex overflow-x-auto scrollbar-hide">
                          {categoryTabs.map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              className={`py-3 px-6 font-medium text-sm ${
                                activeTab === tab
                                  ? "border-b-2 border-blue-600 text-blue-600"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => handleTabChange(tab)}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Fields for active tab */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeTab && formCategories[selectedCategory][activeTab]?.map((field, index) => (
                          <div key={index} className={`${field.type === FormFieldType.Description ? "col-span-1 md:col-span-2" : "col-span-1"}`}>
                            {renderField(field)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-16 text-center">
                      <div className="text-6xl mb-4">👈</div>
                      <h3 className="text-xl font-semibold text-gray-700">Select a category from the sidebar</h3>
                      <p className="text-gray-500 mt-2">Choose a category to see relevant form fields</p>
                    </div>
                  )}
                  
                  {/* Action buttons */}
                  <div className="p-6 bg-gray-50 flex justify-end space-x-4 border-t">
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 border border-transparent rounded-md shadow-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={!selectedCategory}
                    >
                      List Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;