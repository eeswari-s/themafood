import slugify from "slugify";

import ProductModel from "../Models/ProductModel.js";

//================
// Create Product
//================

export const CreateProduct = async (
  request,
  response
) => {
  try {
    const {
      ProductName,
      Description,
      Category,
      SubCategory,

      ProductImages,

      Variants,

      ProductHighlights,

      FeaturedProduct,
      TrendingProduct,
      FestivalProduct,
      BestSellerProduct,
    } = request.body;

    //================
    // Validation
    //================

    if (!ProductName) {
      return response.status(400).json({
        Success: false,
        Message: "ProductName is required",
      });
    }

    if (!Description) {
      return response.status(400).json({
        Success: false,
        Message: "Description is required",
      });
    }

    if (!Category) {
      return response.status(400).json({
        Success: false,
        Message: "Category is required",
      });
    }

    if (!SubCategory) {
      return response.status(400).json({
        Success: false,
        Message: "SubCategory is required",
      });
    }

    //================
    // Slug Generate
    //================

    const Slug = slugify(ProductName, {
      lower: true,
      strict: true,
      trim: true,
    });

    //================
    // Existing Product
    //================

    const ExistingProduct =
      await ProductModel.findOne({
        Slug,
        IsDeleted: false,
      });

    if (ExistingProduct) {
      return response.status(400).json({
        Success: false,
        Message:
          "Product already exists",
      });
    }

    //================
    // Variant Parsing
    //================

    let ParsedVariants = [];

    if (Variants) {
      ParsedVariants =
        typeof Variants === "string"
          ? JSON.parse(Variants)
          : Variants;
    }

    //================
    // Product Highlights Parsing
    //================

    let ParsedHighlights = [];

    if (ProductHighlights) {
      ParsedHighlights =
        typeof ProductHighlights ===
        "string"
          ? JSON.parse(
              ProductHighlights
            )
          : ProductHighlights;
    }

    //================
    // Product Images Parsing
    //================

    let ParsedImages = [];

    if (ProductImages) {
      ParsedImages =
        typeof ProductImages === "string"
          ? JSON.parse(ProductImages)
          : ProductImages;
    }

    //================
    // Offer Price Calculation
    //================

    const FinalVariants =
      ParsedVariants.map((Variant) => {
        const OriginalPrice =
          Number(Variant.OriginalPrice);

        const OfferPercentage =
          Number(
            Variant.OfferPercentage || 0
          );

        const DiscountAmount =
          (OriginalPrice *
            OfferPercentage) /
          100;

        const OfferPrice =
          OriginalPrice - DiscountAmount;

        return {
          ...Variant,

          OfferPrice:
            Math.round(OfferPrice),
        };
      });

    //================
    // Create Product
    //================

    const NewProduct =
      await ProductModel.create({
        ProductName,

        Slug,

        Description,

        Category,

        SubCategory,

        ProductImages: ParsedImages,

        Variants: FinalVariants,

        ProductHighlights:
          ParsedHighlights,

        FeaturedProduct:
          FeaturedProduct || false,

        TrendingProduct:
          TrendingProduct || false,

        FestivalProduct:
          FestivalProduct || false,

        BestSellerProduct:
          BestSellerProduct || false,
      });

    response.status(201).json({
      Success: true,
      Message:
        "Product created successfully",

      Product: NewProduct,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Get All Products
//================

export const GetAllProducts = async (
  request,
  response
) => {
  try {
    const Products =
      await ProductModel.find({
        IsDeleted: false,
      }).sort({
        createdAt: -1,
      });

    response.status(200).json({
      Success: true,
      TotalProducts: Products.length,

      Products,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Get Single Product
//================

export const GetSingleProduct = async (
  request,
  response
) => {
  try {
    const { ProductID } =
      request.params;

    const Product =
      await ProductModel.findOne({
        _id: ProductID,

        IsDeleted: false,
      });

    if (!Product) {
      return response.status(404).json({
        Success: false,
        Message: "Product not found",
      });
    }

    response.status(200).json({
      Success: true,

      Product,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Update Product
//================

export const UpdateProduct = async (
  request,
  response
) => {
  try {
    const { ProductID } = request.params;

    const {
      ProductName,
      Description,
      Category,
      SubCategory,

      ProductImages,

      Variants,

      ProductHighlights,

      FeaturedProduct,
      TrendingProduct,
      FestivalProduct,
      BestSellerProduct,

      IsAvailable,
    } = request.body;

    //================
    // Existing Product
    //================

    const ExistingProduct =
      await ProductModel.findOne({
        _id: ProductID,
        IsDeleted: false,
      });

    if (!ExistingProduct) {
      return response.status(404).json({
        Success: false,
        Message: "Product not found",
      });
    }

    //================
    // Slug Generate
    //================

    let Slug = ExistingProduct.Slug;

    if (
      ProductName &&
      ProductName !==
        ExistingProduct.ProductName
    ) {
      Slug = slugify(ProductName, {
        lower: true,
        strict: true,
        trim: true,
      });

      const DuplicateProduct =
        await ProductModel.findOne({
          Slug,
          _id: {
            $ne: ProductID,
          },
          IsDeleted: false,
        });

      if (DuplicateProduct) {
        return response.status(400).json({
          Success: false,
          Message:
            "Product name already exists",
        });
      }
    }

    //================
    // Variant Parsing
    //================

    let ParsedVariants =
      ExistingProduct.Variants;

    if (Variants) {
      ParsedVariants =
        typeof Variants === "string"
          ? JSON.parse(Variants)
          : Variants;
    }

    //================
    // Product Highlights Parsing
    //================

    let ParsedHighlights =
      ExistingProduct.ProductHighlights;

    if (ProductHighlights) {
      ParsedHighlights =
        typeof ProductHighlights ===
        "string"
          ? JSON.parse(
              ProductHighlights
            )
          : ProductHighlights;
    }

    //================
    // Product Images Parsing
    //================

    let ParsedImages =
      ExistingProduct.ProductImages;

    if (ProductImages) {
      ParsedImages =
        typeof ProductImages === "string"
          ? JSON.parse(ProductImages)
          : ProductImages;
    }

    //================
    // Offer Price Calculation
    //================

    const FinalVariants =
      ParsedVariants.map((Variant) => {
        const OriginalPrice =
          Number(Variant.OriginalPrice);

        const OfferPercentage =
          Number(
            Variant.OfferPercentage || 0
          );

        const DiscountAmount =
          (OriginalPrice *
            OfferPercentage) /
          100;

        const OfferPrice =
          OriginalPrice - DiscountAmount;

        return {
          ...Variant,

          OfferPrice:
            Math.round(OfferPrice),
        };
      });

    //================
    // Update Product
    //================

    const UpdatedProduct =
      await ProductModel.findByIdAndUpdate(
        ProductID,
        {
          ProductName:
            ProductName ||
            ExistingProduct.ProductName,

          Slug,

          Description:
            Description ||
            ExistingProduct.Description,

          Category:
            Category ||
            ExistingProduct.Category,

          SubCategory:
            SubCategory ||
            ExistingProduct.SubCategory,

          ProductImages:
            ParsedImages,

          Variants:
            FinalVariants,

          ProductHighlights:
            ParsedHighlights,

          FeaturedProduct:
            FeaturedProduct ??
            ExistingProduct.FeaturedProduct,

          TrendingProduct:
            TrendingProduct ??
            ExistingProduct.TrendingProduct,

          FestivalProduct:
            FestivalProduct ??
            ExistingProduct.FestivalProduct,

          BestSellerProduct:
            BestSellerProduct ??
            ExistingProduct.BestSellerProduct,

          IsAvailable:
            IsAvailable ??
            ExistingProduct.IsAvailable,
        },
        {
          new: true,
        }
      );

    response.status(200).json({
      Success: true,
      Message:
        "Product updated successfully",

      Product: UpdatedProduct,
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};

//================
// Delete Product
//================

export const DeleteProduct = async (
  request,
  response
) => {
  try {
    const { ProductID } = request.params;

    const DeletedProduct =
      await ProductModel.findByIdAndUpdate(
        ProductID,
        {
          IsDeleted: true,
        },
        {
          new: true,
          runValidators: false,
        }
      );

    if (!DeletedProduct) {
      return response.status(404).json({
        Success: false,
        Message: "Product not found",
      });
    }

    response.status(200).json({
      Success: true,
      Message:
        "Product deleted successfully",
    });
  } catch (error) {
    response.status(500).json({
      Success: false,
      Message: error.message,
    });
  }
};
