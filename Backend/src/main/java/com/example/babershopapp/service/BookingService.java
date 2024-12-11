package com.example.babershopapp.service;

import com.example.babershopapp.model.Booking;
import com.example.babershopapp.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public void saveBooking(Booking booking) {
        try {
            bookingRepository.save(booking);
        } catch (Exception e) {
            throw new RuntimeException("Error saving booking to database", e);
        }
    }

}
