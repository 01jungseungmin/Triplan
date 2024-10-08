package com.example.triplan.application.api.service;

import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.enums.PlaceCategory;
import com.example.triplan.domain.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class OpenApiManager {

    private final PlaceRepository placeRepository;

    public void loadAndSaveApiData(String apiUrl) throws Exception {
        StringBuffer result = new StringBuffer();

        URL url = new URL(apiUrl);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setRequestProperty("Content-Type", "application/json");

        try (BufferedReader bf = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"))) {
            result.append(bf.readLine());
        }

        parseAndSave(result.toString());
    }

    private void parseAndSave(String jsonResponse) throws ParseException {
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonResponse);

        JSONObject jsonRe = (JSONObject) jsonObject.get("response");
        JSONObject jsonBody = (JSONObject) jsonRe.get("body");
        JSONObject jsonItems = (JSONObject) jsonBody.get("items");
        JSONArray jsonArray = (JSONArray) jsonItems.get("item");


        if (jsonArray == null || jsonArray.isEmpty()) {
            throw new IllegalArgumentException("No data received from the API.");
        }

        for (Object obj : jsonArray) {
            JSONObject object = (JSONObject) obj;
                String placeName = String.valueOf(object.get("CON_TITLE"));
                String placeAddress = String.valueOf(object.get("CON_ADDRESS"));
                String conLatitude = String.valueOf(object.get("CON_LATITUDE"));
                String conLongitude = String.valueOf(object.get("CON_LONGITUDE"));
                String placeNumber = String.valueOf(object.get("CON_PHONE"));
                String placeBusinessHours = String.valueOf(object.get("CON_SUMMARY"));
            OpenApiDto dto = new OpenApiDto(placeName, placeAddress, conLatitude, conLongitude, placeNumber, placeBusinessHours, PlaceCategory.RESTAURANT);
            save(dto);
        }
    }

    public void save(OpenApiDto dto){
        Place place = dto.toEntity();
        placeRepository.save(place);
    }
}
