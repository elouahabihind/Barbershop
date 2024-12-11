package com.example.babershopapp.controller;

import com.example.babershopapp.model.Booking;
import com.example.babershopapp.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Map<String, String> createBooking(@RequestBody Booking booking) {
        try {
            bookingService.saveBooking(booking);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Booking successful!");
            return response;
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "An error occurred while booking. Please try again.");
            return response;
        }
    }


}
