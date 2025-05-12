import React from "react";
import {
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ProductCard from "../Products/ProductCard";
import { useCartStore } from '../../store/cartStore';

import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product, allProducts = [] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  if (!product) return null;

  // Filter related products from the same category (excluding the current one)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth="1200px" mx="auto" bgcolor="#f9fafb">
      <Grid container spacing={4} alignItems="flex-start">
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Box
            bgcolor="white"
            borderRadius={4}
            p={2}
            boxShadow={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CardMedia
              component="img"
              image={product.image || "https://placehold.co/300x300.png?text=Image+Not+Available"}
              alt={product.title}
              onError={(e) => {
              e.target.src =
                "https://placehold.co/300x300.png?text=Image+Not+Available";
              }}
              sx={{
                objectFit: "contain",
                height: "350px",
                maxWidth: "100%",
              }}
            />
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h4" fontWeight={600} color="text.primary">
              {product.title}
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap">
              {product.category && (
                <Chip
                  label={product.category.toUpperCase()}
                  color="secondary"
                  size="small"
                  variant="outlined"
                />
              )}
              {product.brand && (
                <Chip
                  label={product.brand.toUpperCase()}
                  sx={{ backgroundColor: "#f9a8d4", color: "white" }}
                  size="small"
                />
              )}
            </Box>

            <Rating
              name="product-rating"
              value={product.rating?.rate || 0}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary">
              ({product.rating?.count || 0} reviews)
            </Typography>

            <Typography variant="h5" fontWeight="bold" color="secondary">
              ${product.price}
            </Typography>

            {product.discount > 0 && (
              <Box display="flex" gap={2} alignItems="center">
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "gray" }}
                >
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                </Typography>
                <Chip
                  label={`-${product.discount}%`}
                  sx={{
                    background: "#ec4899",
                    color: "white",
                    fontWeight: 600,
                  }}
                  size="small"
                />
              </Box>
            )}

            <Typography variant="body2" color="text.secondary">
              {product.model && `Model: ${product.model}`}
              {product.color && ` | Color: ${product.color}`}
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              sx={{
                mt: 2,
                py: 1.5,
                background: "#ec4899",
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  background: "#db2777",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Description */}
      <Box mt={6} p={3} bgcolor="white" borderRadius={4} boxShadow={1}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Description
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          whiteSpace="pre-line"
        >
          {product.description}
        </Typography>
      </Box>

      {/* Specifications */}
      <Box mt={6} p={3} bgcolor="white" borderRadius={4} boxShadow={1}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Specifications
        </Typography>
        <Grid container spacing={2}>
          {product.brand && (
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Brand</Typography>
              <Typography fontWeight={500}>{product.brand}</Typography>
            </Grid>
          )}
          {product.model && (
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Model</Typography>
              <Typography fontWeight={500}>{product.model}</Typography>
            </Grid>
          )}
          {product.color && (
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Color</Typography>
              <Typography fontWeight={500}>{product.color}</Typography>
            </Grid>
          )}
          {product.category && (
            <Grid item xs={6} sm={3}>
              <Typography variant="body2">Category</Typography>
              <Typography fontWeight={500}>{product.category}</Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Reviews */}
      <Box mt={6} p={3} bgcolor="white" borderRadius={4} boxShadow={1}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Customer Reviews
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ★★★★☆ ({product.rating?.rate || 0}/5 from {product.rating?.count || 0}{" "}
          reviews)
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" fontStyle="italic">
          “Great product quality and value for money!” – Verified Buyer
        </Typography>
      </Box>

      {/* Related Products */}
      <Box mt={6}>
        <Typography
          variant="h6"
          fontWeight={600}
          gutterBottom
          color="secondary"
        >
          Related Products
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default ProductDetail;
