import asyncHandler from "express-async-handler";
import Store from "../models/Store.js";

// @desc    fetch all the store
// @route   GET /api/stores/
// @access  public
export const getStore = asyncHandler(async (req, res) => {
  const stores = await Store.find({});
  stores.length === 0
    ? res.json({ message: "No store located" })
    : res.json(stores);
});

// @desc    fetch all the info about one store
// @route   GET /api/stores/:id
// @access  public
export const getStoreInfo = asyncHandler(async (req, res) => {
  const storeId = req.params;
  const _id = storeId.id;
  const store = await Store.findById({ _id });
  if (!store) {
    res.json({
      message: "No store found, Invalid Store ID",
    });
  }
  res.json(store);
});

// @desc    create a new store
// @route   POST /api/stores/create
// @access  private
export const createStore = asyncHandler(async (req, res) => {
  const {
    storeName,
    storeLocationLat,
    storeLocationLng,
    storeAddress,
    storeCity,
    storePostalCode,
    storeCountry,
    monOpen,
    monClose,
    tueOpen,
    tueClose,
    wedOpen,
    wedClose,
    thuOpen,
    thuClose,
    friOpen,
    friClose,
    satOpen,
    satClose,
    sunOpen,
    sunClose,
    storePhone,
    storeNearby,
  } = req.body;

  const storeNameAlreadyExist = await Store.findOne({ storeName });
  if (storeNameAlreadyExist && storeNameAlreadyExist.name) {
    res.json({
      error: "store name already taken",
      success: false,
    });
  } else {
    const newStore = await Store.create({
      store_name: storeName,
      store_location_lat: storeLocationLat,
      store_location_lng: storeLocationLng,
      store_address: storeAddress,
      store_city: storeCity,
      store_postal_code: storePostalCode,
      store_country: storeCountry,
      store_timing: {
        monday_open: monOpen,
        monday_close: monClose,
        tuesday_open: tueOpen,
        tuesday_close: tueClose,
        wednesday_open: wedOpen,
        wednesday_close: wedClose,
        thursday_open: thuOpen,
        thursday_close: thuClose,
        friday_open: friOpen,
        friday_close: friClose,
        saturday_open: satOpen,
        saturday_close: satClose,
        sunday_open: sunOpen,
        sunday_close: sunClose,
      },
      store_phone: storePhone,
      store_nearby: storeNearby,
    });
    if (newStore) {
      res.json({
        _id: newStore._id,
        store_name: newStore.store_name,
        store_location_lat: newStore.store_location_lat,
        store_location_lng: newStore.store_location_lng,
        store_address: newStore.store_address,
        store_city: newStore.store_city,
        store_postal_code: newStore.store_postal_code,
        store_country: newStore.store_country,
        monday_open: newStore.store_timing.monday_open,
        monday_close: newStore.store_timing.monday_close,
        tuesday_open: newStore.store_timing.tuesday_open,
        tuesday_close: newStore.store_timing.tuesday_close,
        wednesday_open: newStore.store_timing.wednesday_open,
        wednesday_close: newStore.store_timing.wednesday_close,
        thursday_open: newStore.store_timing.thursday_open,
        thursday_close: newStore.store_timing.thursday_close,
        friday_open: newStore.store_timing.friday_open,
        friday_close: newStore.store_timing.friday_close,
        saturday_open: newStore.store_timing.saturday_open,
        saturday_close: newStore.store_timing.saturday_close,
        sunday_open: newStore.store_timing.sunday_open,
        sunday_close: newStore.store_timing.sunday_close,
        store_phone: newStore.store_timing.store_phone,
        store_nearby: newStore.store_nearby,
      });
    }
  }
});

// @desc    update the store data
// @route   POST /api/stores/:id
// @access  private
export const updateStore = asyncHandler(async (req, res) => {
  const storeId = req.params;
  const {
    storeName,
    storeLocationLat,
    storeLocationLng,
    storeAddress,
    storeCity,
    storePostalCode,
    storeCountry,
    monOpen,
    monClose,
    tueOpen,
    tueClose,
    wedOpen,
    wedClose,
    thuOpen,
    thuClose,
    friOpen,
    friClose,
    satOpen,
    satClose,
    sunOpen,
    sunClose,
    storePhone,
    storeNearby,
  } = req.body;

  const _id = storeId.id;
  const store = await Store.findById({ _id });
  if (!store) {
    res.json({
      message: "No store found, Invalid Store ID",
    });
  } else {
    store.store_name = storeName || store.store_name;
    store.store_location_lat = storeLocationLat || store.store_location_lat;
    store.store_location_lng = storeLocationLng || store.store_location_lng;
    store.store_address = storeAddress || store.store_address;
    store.store_city = storeCity || store.store_city;
    store.store_postal_code = storePostalCode || store.store_postal_code;
    store.store_country = storeCountry || store.store_country;
    (store.store_timing.monday_open =
      monOpen || store.store_timing.monday_open),
      (store.store_timing.monday_close =
        monClose || store.store_timing.monday_close),
      (store.store_timing.tuesday_open =
        tueOpen || store.store_timing.tuesday_open),
      (store.store_timing.tuesday_close =
        tueClose || store.store_timing.tuesday_close),
      (store.store_timing.wednesday_open =
        wedOpen || store.store_timing.wednesday_open),
      (store.store_timing.wednesday_close =
        wedClose || store.store_timing.wednesday_close),
      (store.store_timing.thursday_open =
        thuOpen || store.store_timing.thursday_open),
      (store.store_timing.thursday_close =
        thuClose || store.store_timing.thursday_close),
      (store.store_timing.friday_open =
        friOpen || store.store_timing.friday_open),
      (store.store_timing.friday_close =
        friClose || store.store_timing.friday_close),
      (store.store_timing.saturday_open =
        satOpen || store.store_timing.saturday_open),
      (store.store_timing.saturday_close =
        satClose || store.store_timing.saturday_close),
      (store.store_timing.sunday_open =
        sunOpen || store.store_timing.sunday_open),
      (store.store_timing.sunday_close =
        sunClose || store.store_timing.sunday_close),
      (store.store_phone = storePhone || store.store_phone);
    store.store_nearby = storeNearby || store.store_nearby;
    // saving up the data
    const storeUpdated = await store.save();

    res.json({
      _id: storeUpdated._id,
      store_name: storeUpdated.store_name,
      store_location_lat: storeUpdated.store_location_lat,
      store_location_lng: storeUpdated.store_location_lng,
      store_address: storeUpdated.store_address,
      store_city: storeUpdated.store_city,
      store_postal_code: storeUpdated.store_postal_code,
      store_country: storeUpdated.store_country,
      monday_open: storeUpdated.store_timing.monday_open,
      monday_close: storeUpdated.store_timing.monday_close,
      tuesday_open: storeUpdated.store_timing.tuesday_open,
      tuesday_close: storeUpdated.store_timing.tuesday_close,
      wednesday_open: storeUpdated.store_timing.wednesday_open,
      wednesday_close: storeUpdated.store_timing.wednesday_close,
      thursday_open: storeUpdated.store_timing.thursday_open,
      thursday_close: storeUpdated.store_timing.thursday_close,
      friday_open: storeUpdated.store_timing.friday_open,
      friday_close: storeUpdated.store_timing.friday_close,
      saturday_open: storeUpdated.store_timing.saturday_open,
      saturday_close: storeUpdated.store_timing.saturday_close,
      sunday_open: storeUpdated.store_timing.sunday_open,
      sunday_close: storeUpdated.store_timing.sunday_close,
      store_phone: storeUpdated.store_timing.store_phone,
      store_nearby: storeUpdated.store_nearby,
      store_reviews: storeUpdated.store_reviews,
    });
  }
});

// @desc    delete the store
// @route   DELETE /api/stores/:id
// @access  private
export const deleteStore = asyncHandler(async (req, res) => {
  const storeId = req.params;
  const _id = storeId.id;
  const store = await Store.findById({ _id });
  if (store) {
    await store.remove();
    res.json({ message: "Store Deleted", success: true, store });
  } else {
    res.status(404).json({
      message: "No store found, Invalid Store ID",
    });
  }

  //   await Store.findByIdAndRemove(_id, function (err, docs) {
  //     if (err) {
  //       res.json({ err, message: "Something went wrong on our end" });
  //     } else {
  //       res.json({
  //         docs,
  //         message: "Store removed from the list",
  //         success: "true",
  //       });
  //     }
  //   });
});

// @desc    submit a review about store
// @route   POST /api/stores/:id/review
// @access  private
export const getStoreReviews = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  store
    ? res.send(store.store_reviews)
    : res.status(400).json({
        message: "🔴Error: Invalid Store ID ",
      });
});

// @desc    submit a review about store
// @route   POST /api/stores/:id/review
// @access  private
export const createStoreReview = asyncHandler(async (req, res) => {
  const { name, comment, rating } = req.body;
  const store = await Store.findById(req.params.id);
  if (store) {
    const reviewObj = { name, comment, rating };
    store.store_reviews.push(reviewObj);
    const updatedStore = await store.save();
    res.json(updatedStore.store_reviews);
  } else {
    res.json({ error: "INVALID STORE_ID --- Could not found the store" });
  }
});

// @desc    delete a review about store
// @route   DELETE /api/stores/:id/review
// @access  private
export const deleteStoreReview = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  let found = false;
  if (store) {
    const review = store.store_reviews;
    if (review) {
      // check the index of review by using objectid
      for (let item of review) {
        const id = String(item._id).split('"')[0];
        if (id === req.params.reviewId) {
          found = true;
          review.splice(review.indexOf(item), 1);
        }
      }
      store.save();
      found
        ? res.json({
            message: "Review Deleted",
            success: true,
          })
        : res.status(400).json("🔴Error: review do not exist");
    }
  } else {
    res.status(400);
    throw new Error("🔴Error: store do not exist");
  }
});

// @desc    update a review about store
// @route   PUT /api/stores/:id/review
// @access  private
export const updateStoreReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const store = await Store.findById(req.params.id);
  let found = false;
  if (store) {
    const review = store.store_reviews;
    if (review) {
      // check the index of review by using objectid
      for (let item of review) {
        const id = String(item._id).split('"')[0];
        if (id === req.params.reviewId) {
          found = true;
          item.comment = comment;
          item.rating = rating || item.rating;
        }
      }
      store.save();
      found
        ? res.json(review)
        : res.status(400).json("🔴Error: review do not exist");
    }
  } else {
    res.status(400);
    throw new Error("🔴Error: store do not exist");
  }
});
