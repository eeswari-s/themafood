import mongoose from "mongoose";

//================
// Variant Image Schema
//================

const VariantImageSchema = new mongoose.Schema(
  {
    ImageURL: {
      type: String,
      required: true,
    },

    PublicID: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

//================
// Variant Schema
//================

const VariantSchema = new mongoose.Schema(
  {
    Weight: {
      type: String,
      required: true,
      trim: true,
    },

    OriginalPrice: {
      type: Number,
      required: true,
    },

    OfferPercentage: {
      type: Number,
      required: true,
      default: 0,
    },

    OfferPrice: {
      type: Number,
      required: true,
    },

    Stock: {
      type: Number,
      required: true,
      default: 0,
    },

    VariantImages: [VariantImageSchema],
  },
  {
    _id: true,
  }
);

//================
// Product Image Schema
//================

const ProductImageSchema = new mongoose.Schema(
  {
    ImageURL: {
      type: String,
      required: true,
    },

    PublicID: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

//================
// Product Highlight Schema
//================

const ProductHighlightSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      trim: true,
    },

    Content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

//================
// Product Schema
//================

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },

   
    Description: {
      type: String,
      required: true,
      trim: true,
    },

    Category: {
      type: String,
      required: true,
      trim: true,
    },

    SubCategory: {
      type: String,
      required: true,
      trim: true,
    },

    ProductImages: [ProductImageSchema],

    Variants: [VariantSchema],

    ProductHighlights: [ProductHighlightSchema],

    FeaturedProduct: {
      type: Boolean,
      default: false,
    },

    TrendingProduct: {
      type: Boolean,
      default: false,
    },

    FestivalProduct: {
      type: Boolean,
      default: false,
    },

    BestSellerProduct: {
      type: Boolean,
      default: false,
    },

    IsAvailable: {
      type: Boolean,
      default: true,
    },

    IsDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model(
  "Product",
  ProductSchema
);

export default ProductModel;