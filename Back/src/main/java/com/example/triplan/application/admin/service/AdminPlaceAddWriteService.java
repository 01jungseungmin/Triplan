package com.example.triplan.application.admin.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.application.admin.dto.request.AdminPlaceAddRequest;
import com.example.triplan.application.admin.dto.request.AdminPlaceAddUpdateRequest;
import com.example.triplan.application.s3.service.S3ImageService;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.enums.Role;
import com.example.triplan.domain.place.entity.Place;
import com.example.triplan.domain.place.repository.PlaceRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.S3Exception;
import com.example.triplan.exception.TriplanException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminPlaceAddWriteService {

    private final AccountService accountService;
    private final PlaceRepository placeRepository;
    private final S3ImageService s3ImageService;


    //관리자 장소 추가
    public String adminPlaceAdd(AdminPlaceAddRequest adminPlaceAddRequest, List<MultipartFile> images) throws S3Exception {
        Account account = accountService.getCurrentUser();

        if (account.getRole() != Role.ROLE_ADMIN){
            throw new TriplanException(ErrorCode.ACCESS_DENIED);
        }

        Place place = new Place(adminPlaceAddRequest.getPlaceAddName(), adminPlaceAddRequest.getPlaceAddAddress(), null, null, adminPlaceAddRequest.getPlaceNumber(),
                adminPlaceAddRequest.getPlaceHoliday(), adminPlaceAddRequest.getPlaceBusinessHours(), adminPlaceAddRequest.getPlaceCategory(), null);
        placeRepository.save(place);

        if (images != null && !images.isEmpty()) {
            s3ImageService.uploadImages(images);
        }

        place.setImgUrl(images.toString());

        return "관리자 장소 추가 완료";
    }


    //관리자 장소 수정
    public String adminPlaceUpdate(AdminPlaceAddUpdateRequest adminPlaceAddUpdateRequest) {
        Account account = accountService.getCurrentUser();

        if (account.getRole() != Role.ROLE_ADMIN){
            throw new TriplanException(ErrorCode.ACCESS_DENIED);
        }

        Place place = placeRepository.findById(adminPlaceAddUpdateRequest.getPlaceId()).orElseThrow(() -> new TriplanException(ErrorCode.PLACE_NOT_FOUND));
        place.setPlace(adminPlaceAddUpdateRequest.getPlaceAddName(), adminPlaceAddUpdateRequest.getPlaceAddAddress(), adminPlaceAddUpdateRequest.getPlaceNumber(), adminPlaceAddUpdateRequest.getPlaceHoliday(),
                adminPlaceAddUpdateRequest.getPlaceBusinessHours());

        return "관리자 장소 수정 완료";
    }


    //관리자 장소 삭제
    public String adminPlaceDelete(Long placeId) {
        Account account = accountService.getCurrentUser();

        if (account.getRole() != Role.ROLE_ADMIN){
            throw new TriplanException(ErrorCode.ACCESS_DENIED);
        }

        Place place = placeRepository.findById(placeId).orElseThrow(() -> new TriplanException(ErrorCode.PLACE_NOT_FOUND));

        placeRepository.delete(place);

        return "관리자 장소 삭제 완료";
    }
}
