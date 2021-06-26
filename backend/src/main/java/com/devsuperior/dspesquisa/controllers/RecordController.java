package com.devsuperior.dspesquisa.controllers;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dspesquisa.dto.RecordDTO;
import com.devsuperior.dspesquisa.dto.RecordInsertDTO;
import com.devsuperior.dspesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records")
public class RecordController {

	@Autowired
	private RecordService service;
	
	@GetMapping
	public ResponseEntity<Page<RecordDTO>> findAll(Pageable pageable,
			@RequestParam(value = "min", defaultValue = "") String min,
			@RequestParam(value = "max", defaultValue = "") String max){
		Instant minDate = ("".equals(min)) ? null : Instant.parse(min);
		Instant maxDate = ("".equals(max)) ? null : Instant.parse(max);
		Page<RecordDTO> page = service.findByMoments(pageable, minDate, maxDate);
		return ResponseEntity.ok().body(page);
	}

	@PostMapping
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO dto){
		RecordDTO newDTO = service.insert(dto);
		
		return ResponseEntity.ok().body(newDTO);
	}
}
