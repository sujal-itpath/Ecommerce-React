import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ShoppingCart,
  Visibility,
  LocalOffer,
  Star,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useCartStore } from "../../../store/cartStore";

import SnackBar from "../../common/SnackBar";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      return showSnackbar("Please login to add items to cart", "warning");
    }
    addToCart(product);
    showSnackbar("Item added to cart!");
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      return showSnackbar("Please login to manage wishlist", "warning");
    }
    toggleWishlist(product);
    const msg = isInWishlist ? "Removed from wishlist" : "Added to wishlist";
    showSnackbar(msg);
  };
  return (
    <>
      <Card
        onClick={() => navigate(`/products/${product.id}`)}
        className="group relative flex flex-col sm:flex-row rounded-3xl border border-gray-200 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden cursor-pointer"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Image Section */}
        <Box
          className="relative w-full sm:w-44 h-48 sm:h-auto flex items-center justify-center bg-gradient-to-br overflow-hidden"
          sx={{ p: 2 }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <img
              src={
                product.image ||
                "https://placehold.co/300x300.png?text=Image+Not+Available"
              }
              alt={product.title}
              className="h-32 w-32 object-contain transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/300x300.png?text=Image+Not+Available";
              }}
            />
          </Box>

          {product.discount > 0 && (
            <Chip
              label={`${product.discount}% OFF`}
              size="small"
              className="absolute top-2 left-2 text-white"
              sx={{
                background: "linear-gradient(to right, #ec4899, #f472b6)",
                fontWeight: "bold",
                fontSize: "0.7rem",
              }}
            />
          )}

          {/* Quick View on Hover */}
          <Box className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Tooltip title="Quick view">
              <IconButton
                size="small"
                sx={{
                  bgcolor: "white",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "#f9e1ec" },
                }}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content Section */}
        <CardContent className="flex-1 flex flex-col justify-between px-4 py-5 space-y-3">
          {/* Category */}
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            className="text-xs text-gray-500 uppercase"
          >
            <LocalOffer sx={{ fontSize: 14, color: "gray" }} />
            {product.category || "Product"}
          </Box>

          {/* Title */}
          <Typography
            variant="subtitle1"
            className="font-medium text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors"
          >
            {product.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            className="text-gray-500 text-sm line-clamp-2"
          >
            {product.description?.split(" ").slice(0, 15).join(" ")}...
          </Typography>

          {/* Rating */}
          {product.rating && (
            <Box display="flex" alignItems="center" gap={0.5}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  fontSize="small"
                  sx={{
                    color: star <= product.rating?.rate ? "#ec4899" : "#e5e7eb",
                  }}
                />
              ))}
              <Typography variant="caption" color="textSecondary">
                ({product.rating.count || 0})
              </Typography>
            </Box>
          )}

          {/* Price + Action Icons */}
          <Box className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-3 sm:gap-0">
            {/* Price */}
            <Box display="flex" alignItems="baseline" gap={1}>
              <Typography
                variant="h6"
                className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent font-semibold"
              >
                ${product.price}
              </Typography>
              <Typography
                variant="body2"
                className="line-through text-gray-400"
              >
                ${(product.price * 1.2).toFixed(2)}
              </Typography>
            </Box>

            {/* Actions */}
            <Box
  display="flex"
  gap={1}
  sx={{
    flexDirection: {
      xs: "row-reverse", // cart left, wishlist right on small screens
      sm: "row",         // normal order on larger screens
    },
  }}
>
  <Tooltip
    title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
  >
    <IconButton
      size="small"
      onClick={handleToggleWishlist}
      sx={{
        color: isInWishlist ? "#ec4899" : "gray",
        "&:hover": { color: "#ec4899" },
      }}
    >
      {isInWishlist ? (
        <Favorite fontSize="small" />
      ) : (
        <FavoriteBorder fontSize="small" />
      )}
    </IconButton>
  </Tooltip>
  <Tooltip title="Add to cart">
    <IconButton
      size="small"
      onClick={handleAddToCart}
      sx={{
        color: "white",
        background: "linear-gradient(to right, #ec4899, #f472b6)",
        "&:hover": {
          background: "linear-gradient(to right, #db2777, #f43f5e)",
        },
      }}
    >
      <ShoppingCart fontSize="small" />
    </IconButton>
  </Tooltip>
</Box>

          </Box>
        </CardContent>
      </Card>

      {/* Snackbar Notification */}
      <SnackBar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
};

export default ProductCard;
