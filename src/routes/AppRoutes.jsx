import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Components/Home';
import Countries from '../components/Components/Countries';
import CountriesDetails from '../components/Components/CountriesDetails';
import LoginForm from '../components/features/authentication/LoginForm';
import SignUpForm from '../components/features/authentication/SignUpForm';
import ReviewForm from '../components/features/reviews/ReviewForm';
import ReviewCard from '../components/features/reviews/ReviewCard';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:id" element={<CountriesDetails />} />

      {/* Auth */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      {/* hizi ndo Protected Routes */}
      <Route
        path="/reviews"
        element={
          <ProtectedRoute>
            <ReviewCard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reviews/new"
        element={
          <ProtectedRoute>
            <ReviewForm />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;



